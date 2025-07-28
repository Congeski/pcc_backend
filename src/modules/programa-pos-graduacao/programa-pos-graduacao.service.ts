import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/service/prisma.service';
import { CreateProgramaPosGraduacaoDto } from './dto/create-programa-pos-graduacao.dto';
import { UpdateProgramaPosGraduacaoDto } from './dto/update-programa-pos-graduacao.dto';

@Injectable()
export class ProgramaPosGraduacaoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDto: CreateProgramaPosGraduacaoDto) {
    return this.prisma.programaPosGraduacao.create({
      data: createDto,
    });
  }

  async findAll() {
    return this.prisma.programaPosGraduacao.findMany({
      where: { status: true },
    });
  }

  async findOne(id: string) {
    const programa = await this.prisma.programaPosGraduacao.findUnique({
      where: { id },
    });
    if (!programa) {
      throw new NotFoundException(`Programa com ID ${id} não encontrado.`);
    }
    return programa;
  }

  async update(id: string, updateDto: UpdateProgramaPosGraduacaoDto) {
    await this.findOne(id); 
    return this.prisma.programaPosGraduacao.update({
      where: { id },
      data: updateDto,
    });
  }

  async deactivate(id: string) {
    await this.findOne(id); 
    return this.prisma.programaPosGraduacao.update({
      where: { id },
      data: { status: false },
    });
  }
}