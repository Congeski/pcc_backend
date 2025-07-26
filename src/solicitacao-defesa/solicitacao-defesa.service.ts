// src/solicitacao-defesa/solicitacao-defesa.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../service/prisma.service';
import { CreateSolicitacaoDefesaDto } from './dto/create-solicitacao-defesa.dto';

@Injectable()
export class SolicitacaoDefesaService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateSolicitacaoDefesaDto) {
    const aluno = await this.prisma.aluno.findFirst({
      where: { usuario_id: userId },
      include: { aluno_professor: true }
    });

    if (!aluno) {
      throw new NotFoundException('Aluno não encontrado');
    }

    const orientador = aluno.aluno_professor.find(a => !a.professor_id);
    if (!orientador) {
      throw new BadRequestException('Orientador não vinculado ao aluno');
    }

    const solicitacaoDefesa = await this.prisma.solicitacaoDefesa.create({
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
        secretaria: { connect: { id: dto.secretaria_id  } },
        status: 'PENDENTE',
        professores_banca: {
          create: dto.professores_banca_examinadora.map((professor) => ({
            professor_banca_id: professor.id,
            suplente: professor.eh_suplente,
            copia_impressa: professor.copia_impressa,
          })),
        },
      },
    });

    for (const professor of dto.professores_banca_examinadora) {
      await this.prisma.solicitacaoBancaProfessor.create({
        data: {
          professor: { connect: { id: professor.id } },
          suplente: professor.eh_suplente,
          copia_impressa: professor.copia_impressa,
          solicitacao_defesa: {
            connect: { id: solicitacaoDefesa.id },
          },
        },
      });
    }

    return solicitacaoDefesa;
  }
}
