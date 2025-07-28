import { Injectable, NotFoundException } from '@nestjs/common';
import { Professor } from '@prisma/client';
import { PrismaService } from 'src/service/prisma.service';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';

@Injectable()
export class ProfessorService {
  constructor(private prisma: PrismaService) {}

  async create(createProfessorDto: CreateProfessorDto): Promise<Professor> {
    return await this.prisma.professor.create({
      data: createProfessorDto,
    });
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
