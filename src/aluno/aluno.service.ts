import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Aluno, Usuario } from '@prisma/client';
import { PrismaService } from '../service/prisma.service';
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
    const ra_regex = createAlunoDto.email_institucional.split('@')[0];
    try {
      await this.prisma.usuario.create({
        data: {
          email_institucional: createAlunoDto.email_institucional,
          nome_civil: createAlunoDto.nome_civil,
          aluno: {
            create: {
              qualificacao: createAlunoDto.qualificacao,
              ra: ra_regex,
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

  async findAll(): Promise<Aluno[]> {
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
    console.log('DTO RECEBIDO NO SERVIÇO:', updateAlunoDto);

    console.log('--- INICIANDO UPDATE ---');
    console.log('DTO RECEBIDO:', JSON.stringify(updateAlunoDto, null, 2));
    const aluno = await this.prisma.usuario.findFirst({
      where: { id },
    });

    if (!aluno) {
      throw new NotFoundException(`Aluno não encontrado`);
    }

    try {
      const aluno_atualizado = await this.prisma.usuario.update({
        where: {id: aluno.id},
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
            select:{
              celular: true,
              data_de_ingresso: true,
              email_pessoal: true,
              cpf: true,
              nome_social: true,
              ra: true,
              qualificacao: true,
            }
          },
        }
      });
      return aluno_atualizado;
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
