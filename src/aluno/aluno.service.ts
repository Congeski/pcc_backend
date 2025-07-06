import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Aluno } from '@prisma/client';
import { PrismaService } from '../service/prisma.service';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';

@Injectable()
export class AlunoService {
  constructor(private prisma: PrismaService) {}

  async create(createAlunoDto: CreateAlunoDto): Promise<HttpStatus> {
    try {
      const { usuario_id, ...alunoData } = createAlunoDto;
      await this.prisma.aluno.create({
        data: {
          ...alunoData,
          usuario: {
            connect: {
              id: usuario_id,
            },
          },
        },
      });
      return HttpStatus.CREATED;
    } catch (error) {
      throw new BadRequestException(`Erro ao criar aluno!`);
    }
  }

  async findAll(): Promise<Aluno[]> {
    return this.prisma.aluno.findMany();
  }

  async findOne(id: string): Promise<Aluno> {
    const aluno = await this.prisma.aluno.findUnique({
      where: { id },
    });

    if (!aluno) {
      throw new NotFoundException(`Aluno não encontrado`);
    }

    return aluno;
  }

  async update(id: string, updateAlunoDto: UpdateAlunoDto): Promise<Aluno> {
    const aluno = await this.prisma.aluno.findFirst({
      where: { id },
    });

    if (!aluno) {
      throw new NotFoundException(`Aluno não encontrado`);
    }

    try {
      const updatedAluno = await this.prisma.aluno.update({
        where: { id: aluno.id },
        data: {
          ...updateAlunoDto,
        },
      });

      return updatedAluno;
    } catch (error) {
      throw new BadRequestException(`Erro ao atualizar aluno!`);
    }
  }

  async remove(id: string): Promise<HttpStatus> {
    await this.prisma.aluno.delete({
      where: {id},
    });
    return HttpStatus.OK;
  }
}
