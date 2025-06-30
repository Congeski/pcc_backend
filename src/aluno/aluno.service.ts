import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../service/prisma.service';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { Aluno } from '@prisma/client';

@Injectable()
export class AlunoService {
  constructor(private prisma: PrismaService) {}

  async create(createAlunoDto: CreateAlunoDto): Promise<Aluno> {
    return this.prisma.aluno.create({
      data: createAlunoDto,
    });
  }

  async findAll(): Promise<Aluno[]> {
    return this.prisma.aluno.findMany();
  }

  async findOne(id: string): Promise<Aluno> {
    const aluno = await this.prisma.aluno.findUnique({
      where: { id },
    });

    if (!aluno) {
      throw new NotFoundException(`Aluno com ID "${id}" não encontrado`);
    }

    return aluno;
  }

  async update(id: string, updateAlunoDto: UpdateAlunoDto): Promise<Aluno> {
    await this.findOne(id); 
    return this.prisma.aluno.update({
      where: { id },
      data: updateAlunoDto,
    });
  }

  async remove(id: string): Promise<Aluno> {
    await this.findOne(id); 
    return this.prisma.aluno.delete({
      where: { id },
    });
  }
}