import { Injectable } from '@nestjs/common';
import { CreateProfessoreDto } from './dto/create-professore.dto';
import { UpdateProfessoreDto } from './dto/update-professore.dto';
import { PrismaService } from 'src/service/prisma.service';
import { Professor } from '@prisma/client';

@Injectable()
export class ProfessoresService {
  constructor (private prisma : PrismaService) {}
  async create(createProfessoreDto: CreateProfessoreDto):Promise<Professor> {
    return this.prisma.professor.create({data: createProfessoreDto});
  }

  async findAll():Promise<Professor[]> {
    return  this.prisma.professor.findMany();
  }

  async findOne(id: number) : Promise<Professor> {
    return this.prisma.professor.findFirst();
  }

  async update(id: string, updateProfessoreDto: UpdateProfessoreDto): Promise<Professor> {
    return this.prisma.professor.update({data:updateProfessoreDto, where:{id}});
  }

  async remove(id: string) {
    return this.prisma.professor.delete({where:{id},});
  }
}
