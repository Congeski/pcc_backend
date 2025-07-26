import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/service/prisma.service';
import { CreateSolicitacaoDefesaDto } from './dto/create-solicitacao-defesa.dto';

@Injectable()
export class SolicitacaoDefesaService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateSolicitacaoDefesaDto) {
    const aluno = await this.prisma.aluno.findFirst({
      where: { usuario_id: userId },
      include: { aluno_professor: true },
    });

    if (!aluno) {
      throw new NotFoundException('Aluno não encontrado');
    }

    const orientador = aluno.aluno_professor.find((a) => !a.professor_id);
    if (!orientador) {
      throw new BadRequestException('Orientador não vinculado ao aluno');
    }

    try {
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
          aluno: { connect: { id: aluno.id } },
          secretaria: { connect: { id: dto.secretaria_id } },
          status: 'PENDENTE',
          professores_banca: {
            create: dto.professores_banca_examinadora.map((professor) => ({
              professor: {
                connect: {
                  id: professor.id,
                },
              },
              professor_banca_id: professor.id,
              suplente: professor.eh_suplente,
              copia_impressa: professor.copia_impressa,
            })),
          },
        },
      });

      return HttpStatus.CREATED;
    } catch (error) {
      console.error(error);
      throw new BadRequestException(
        'Erro ao cadatrar a solicitação de defesa!',
      );
    }
  }
}
