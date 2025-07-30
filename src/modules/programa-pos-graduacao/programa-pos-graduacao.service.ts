import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/service/prisma.service';
import { CreateProgramaPosGraduacaoDto } from './dto/create-programa-pos-graduacao.dto';
import { UpdateProgramaPosGraduacaoDto } from './dto/update-programa-pos-graduacao.dto';

@Injectable()
export class ProgramaPosGraduacaoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(usuarioId: string, createDto: CreateProgramaPosGraduacaoDto) {
    const secretariaEncontrada = await this.prisma.secretaria.findFirst({
      where: {
        usuario_id: usuarioId,
      },
    });

    if (!secretariaEncontrada) {
      throw new BadRequestException('Secretaria não encontrada!');
    }

    return await this.prisma.programaPosGraduacao.create({
      data: {
        ...createDto,
        secretaria_id: secretariaEncontrada.id,
      },
    });
  }

  async findAll() {
    return await this.prisma.programaPosGraduacao.findMany({
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
    const programaPosGraduacaoExiste =
      await this.prisma.programaPosGraduacao.findUnique({
        where: {
          id,
        },
      });

    if (!programaPosGraduacaoExiste) {
      throw new BadRequestException(
        'Não foi encontrado um programa de pós graduação com esse Id!',
      );
    }

    return await this.prisma.programaPosGraduacao.update({
      where: { id: programaPosGraduacaoExiste.id },
      data: updateDto,
    });
  }

  async deactivate(id: string) {
    const programaPosGraduacaoExiste =
      await this.prisma.programaPosGraduacao.findUnique({
        where: {
          id,
        },
      });

    if (!programaPosGraduacaoExiste) {
      throw new BadRequestException(
        'Não foi encontrado um programa de pós graduação com esse Id!',
      );
    }

    return await this.prisma.programaPosGraduacao.update({
      where: { id: programaPosGraduacaoExiste.id },
      data: {
        status: false,
      },
    });
  }
}
