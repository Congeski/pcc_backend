import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Professor } from '@prisma/client';
import { PrismaService } from 'src/service/prisma.service';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';

@Injectable()
export class ProfessorService {
  constructor(private prisma: PrismaService) {}

  async create(createProfessorDto: CreateProfessorDto): Promise<HttpStatus> {
    const email_existe = await this.prisma.usuario.findFirst({
          where: {
            email_institucional: createProfessorDto.email,
          },
        });
    if (email_existe) {
          throw new BadRequestException('Esse email já foi cadastrado!');
    }    
    try{

      await this.prisma.usuario.create({
        data: {
          email_institucional: createProfessorDto.email,
          nome_civil: createProfessorDto.nome_social,
          professor: {
            create: {
              qualificacao: createProfessorDto.qualificacao,
              cpf: createProfessorDto.cpf,
              formacao_origem: createProfessorDto.formacao_origem,
              nome_social: createProfessorDto.nome_social,
              titulacao: createProfessorDto.titulacao,
              celular: createProfessorDto.celular,
              area_atuacao: createProfessorDto.area_atuacao,
            },
          },
        },
      });
      return HttpStatus.CREATED;
    } catch (error) {
      throw new BadRequestException('Erro ao criar professor');
    }
  }

  async findAll(): Promise<Professor[]> {
    return await this.prisma.professor.findMany();
  }

  async findOne(id: string): Promise<Professor> {
    const professor = await this.prisma.professor.findFirst({ where: { id } });
    if (!professor) {
      throw new NotFoundException(`Professor com ID "${id}" não encontrado`);
    }
    return professor;
  }

  async update(
    id: string,
    updateProfessorDto: UpdateProfessorDto,
  ): Promise<Professor> {
    const professor = await this.prisma.professor.findFirst({ where: { id } });
    if (!professor) {
      throw new NotFoundException(`Professor com ID "${id}" não encontrado`);
    }
    return this.prisma.professor.update({
      data: updateProfessorDto,
      where: { id },
    });
  }

  async remove(id: string) {
    const professor = await this.prisma.professor.findFirst({ where: { id } });
    if (!professor) {
      throw new NotFoundException(`Professor com ID "${id}" não encontrado`);
    }
    return this.prisma.professor.delete({ where: { id } });
  }
}
