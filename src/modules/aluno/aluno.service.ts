import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/service/prisma.service';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';

@Injectable()
export class AlunoService {
  constructor(private prisma: PrismaService) {}

  async create(createAlunoDto: CreateAlunoDto): Promise<HttpStatus> {
    const email_existe = await this.prisma.usuario.findFirst({
      where: {
        email_institucional: createAlunoDto.email_institucional,
      },
    });
    if (email_existe) {
      throw new BadRequestException('Esse email já foi cadastrado!');
    }

    const localPart = createAlunoDto.email_institucional.split('@')[0];
    let ra: string | null = null;

    if (localPart.toLowerCase().startsWith('ra')) {
      const numericPart = localPart.substring(2);
      if (/^\d+$/.test(numericPart)) {
        ra = numericPart;
      }
    }

    try {
      await this.prisma.usuario.create({
        data: {
          email_institucional: createAlunoDto.email_institucional,
          nome_civil: createAlunoDto.nome_civil,
          aluno: {
            create: {
              qualificacao: createAlunoDto.qualificacao,
              ra: ra,
              email_pessoal: createAlunoDto.email_pessoal,
              cpf: createAlunoDto.cpf,
              data_de_ingresso: createAlunoDto.data_de_ingresso,
            },
          },
        },
      });
      return HttpStatus.CREATED;
    } catch (error) {
      console.error(error);
      throw new BadRequestException(`Erro ao criar aluno!`);
    }
  }

  async findAll() {
    return await this.prisma.aluno.findMany();
  }

  async findOne(id: string): Promise<object> {
    const aluno = await this.prisma.usuario.findUnique({
      where: { id },
      select: {
        email_institucional: true,
        nome_civil: true,
        senha: true,
        aluno: {
          select: {
            celular: true,
            cpf: true,
            email_pessoal: true,
            nome_social: true,
          },
        },
      },
    });

    if (!aluno) {
      throw new NotFoundException(`Aluno não encontrado`);
    }

    return aluno;
  }

  async update(id: string, updateAlunoDto: UpdateAlunoDto): Promise<object> {
    const { orientadorId, coorientadorIds } = updateAlunoDto;

    const usuario = await this.prisma.usuario.findUnique({
      where: { id },
      include: {
        aluno: true,
      },
    });

    if (!usuario || !usuario.aluno) {
      throw new NotFoundException(`Aluno não encontrado`);
    }

    const alunoId = usuario.aluno.id;

    try {
      const result = await this.prisma.$transaction(async (prisma) => {
        // Atualiza os dados do aluno
        const aluno_atualizado = await prisma.usuario.update({
          where: { id: usuario.id },
          data: {
            senha: updateAlunoDto.senha,
            nome_civil: updateAlunoDto.nome_civil,
            aluno: {
              update: {
                email_pessoal: updateAlunoDto.email_pessoal,
                cpf: updateAlunoDto.cpf,
                celular: updateAlunoDto.celular,
                nome_social: updateAlunoDto.nome_social,
              },
            },
          },
          select: {
            email_institucional: true,
            nome_civil: true,
            senha: true,
            aluno: {
              select: {
                celular: true,
                data_de_ingresso: true,
                email_pessoal: true,
                cpf: true,
                nome_social: true,
                ra: true,
                qualificacao: true,
              },
            },
          },
        });

        // Se um orientadorId for fornecido, atualiza o vínculo
        if (orientadorId) {
          // Remove o orientador antigo (se houver)
          await prisma.alunoProfessor.deleteMany({
            where: {
              aluno_id: alunoId,
              coorientador: false,
            },
          });
          // Cria o novo vínculo de orientador
          await prisma.alunoProfessor.create({
            data: {
              aluno_id: alunoId,
              professor_id: orientadorId,
              coorientador: false,
            },
          });
        }

        // Se coorientadorIds for fornecido, atualiza os vínculos
        if (coorientadorIds) {
          // Remove todos os coorientadores antigos
          await prisma.alunoProfessor.deleteMany({
            where: {
              aluno_id: alunoId,
              coorientador: true,
            },
          });

          // Adiciona os novos coorientadores, se houver algum
          if (Array.isArray(coorientadorIds) && coorientadorIds.length > 0) {
            await prisma.alunoProfessor.createMany({
              data: coorientadorIds.map((profId) => ({
                aluno_id: alunoId,
                professor_id: profId,
                coorientador: true,
              })),
            });
          }
        }

        return aluno_atualizado;
      });

      return result;
    } catch (error) {
      console.error(error);
      throw new BadRequestException(`Erro ao atualizar aluno!`);
    }
  }

  async remove(id: string): Promise<HttpStatus> {
    await this.prisma.usuario.update({
      where: { id },
      data: {
        status: false,
      },
    });
    return HttpStatus.OK;
  }
}
