import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SolicitacaoDefesa, StatusSolicitacao } from '@prisma/client';
import { PrismaService } from 'src/service/prisma.service';
import { UploadService } from 'src/service/upload.service';
import { CreateSolicitacaoDefesaDto } from './dto/create-solicitacao-defesa.dto';

@Injectable()
export class SolicitacaoDefesaService {
  constructor(
    private prisma: PrismaService,
    private uploadAws: UploadService,
  ) {}

  async createSolicitacaoDefesa(
    userId: string,
    dto: CreateSolicitacaoDefesaDto,
    pdf: Express.Multer.File[],
  ) {
    const usuario = await this.prisma.usuario.findFirst({
      where: { id: userId },
      include: {
        aluno: {
          include: {
            aluno_professor: true,
          },
        },
      },
    });

    if (!usuario) {
      throw new NotFoundException('Aluno não encontrado');
    }

    const temOrientador = usuario.aluno?.aluno_professor.find(
      (relacaoAlunoProfessor) => relacaoAlunoProfessor.professor_id,
    );
    if (!temOrientador) {
      throw new BadRequestException('Orientador não vinculado ao aluno');
    }

    const professoresExternosCriadosOuExistentes: {
      professor_id: string;
      suplente: boolean;
      copia_impressa: boolean;
    }[] = [];

    for (const membroExterno of dto.professores_membros_externos || []) {
      const professorExistente = await this.prisma.professor.findFirst({
        where: {
          usuario: {
            email_institucional: membroExterno.email,
          },
        },
        include: {
          usuario: true,
        },
      });

      if (!professorExistente) {
        const professorNovo = await this.prisma.professor.create({
          data: {
            nome_social: membroExterno.nome,
            email_membro_externo: membroExterno.email,
            pertence_uem: false,
            qualificacao: membroExterno.qualificacao,
          },
        });
        professoresExternosCriadosOuExistentes.push({
          professor_id: professorNovo.id,
          suplente: false,
          copia_impressa: false,
        });
      } else {
        professoresExternosCriadosOuExistentes.push({
          professor_id: professorExistente.id,
          suplente: false,
          copia_impressa: false,
        });
      }
    }

    try {
      const solicitacaoDefesaCriada =
        await this.prisma.solicitacaoDefesa.create({
          data: {
            modalidade_defesa: dto.modalidade_defesa,
            data_defesa: new Date(dto.data_defesa),
            horario_defesa: new Date(dto.horario_defesa),
            titulo_trabalho: dto.titulo_trabalho,
            tipo_defesa: dto.tipo_defesa,
            cidade: dto.cidade,
            bloco: dto.bloco,
            sala: dto.sala,
            link_remoto: dto.link_remoto,
            aluno: { connect: { id: usuario?.aluno?.id } },
            secretaria: { connect: { id: dto.secretaria_id } },
            status: 'PENDENTE',
            professores_banca: {
              create: [
                ...dto.professores_banca.map((professor) => ({
                  professor: {
                    connect: {
                      id: professor.professor_id,
                    },
                  },
                  suplente: professor.suplente,
                  copia_impressa: professor.copia_impressa,
                })),
                ...professoresExternosCriadosOuExistentes.map((externo) => ({
                  professor: {
                    connect: {
                      id: externo.professor_id,
                    },
                  },
                  suplente: externo.suplente,
                  copia_impressa: externo.copia_impressa,
                })),
              ],
            },
          },
        });

      if (pdf && pdf.length > 0) {
        const uploadPdf = pdf.map((pdfFile) =>
          this.uploadAws.uploadFile(solicitacaoDefesaCriada, [pdfFile]),
        );

        await Promise.all(uploadPdf);
      }

      return HttpStatus.CREATED;
    } catch (error) {
      console.error(error);
      throw new BadRequestException(
        'Erro ao cadatrar a solicitação de defesa!',
      );
    }
  }

  async getSolicitacaoDefesa(
    solicitacaoId: string,
  ): Promise<SolicitacaoDefesa> {
    const existeSolicitacao = await this.prisma.solicitacaoDefesa.findUnique({
      where: {
        id: solicitacaoId,
      },
      include: {
        professores_banca: true,
        anexo: true,
      },
    });

    if (!existeSolicitacao) {
      throw new NotFoundException(
        'Não foi encontrada nenhuma Solicitação de Defesa com esse ID!',
      );
    }

    return existeSolicitacao;
  }

  async getAllSolicitacaoDefesa(
    usuarioId: string,
  ): Promise<SolicitacaoDefesa[]> {
    const usuarioExiste = await this.prisma.usuario.findUnique({
      where: {
        id: usuarioId,
      },
      include: {
        aluno: true,
      },
    });

    if (!usuarioExiste?.aluno?.id) {
      throw new BadRequestException('Aluno sem acesso as Solicitações!');
    }

    return await this.prisma.solicitacaoDefesa.findMany({
      where: {
        aluno_solicitante_id: usuarioExiste.aluno.id,
      },
      include: {
        anexo: true,
      },
    });
  }

  async aprovarRejeitarSolicitacao(
    solicitacaoId: string,
    status: StatusSolicitacao,
    justificativa?: string,
  ): Promise<SolicitacaoDefesa> {
    const solicitacao = await this.prisma.solicitacaoDefesa.findUnique({
      where: { id: solicitacaoId },
    });

    if (!solicitacao) {
      throw new NotFoundException('Solicitação de defesa não encontrada');
    }

    if (solicitacao.status == StatusSolicitacao.REPROVADO && !justificativa) {
      throw new BadRequestException(
        'Justificativa é obrigatória para reprovação',
      );
    }
    return this.prisma.solicitacaoDefesa.update({
      where: { id: solicitacaoId },
      data: { status, justificativa: justificativa || null },
    });
  }
}
