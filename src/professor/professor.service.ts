import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';
import { PrismaService } from 'src/service/prisma.service';
import { Professor } from '@prisma/client';

@Injectable()
export class ProfessorService {
  constructor (private prisma : PrismaService) {}
  

  async create(createProfessorDto: CreateProfessorDto):Promise<Professor> {
    console.log('DTO RECEBIDO NO SERVIÇO:', CreateProfessorDto);

    console.log('--- INICIANDO CREATE ---');
    console.log('DTO RECEBIDO:', JSON.stringify(CreateProfessorDto, null, 2));
    return await this.prisma.professor.create({
      data: createProfessorDto,
    });
    
  }

  async findAll():Promise<Professor[]> {
    console.log('DTO RECEBIDO NO SERVIÇO DE CONSULTAR PROFESSORES', );

    console.log('--- INICIANDO UPDATE ---');
    console.log('DTO RECEBIDO:', JSON.stringify(CreateProfessorDto, null, 2));
    return  await this.prisma.professor.findMany();
  }

  async findOne(id: string) : Promise<Professor> {
    console.log('DTO RECEBIDO NO SERVIÇO DE BUSCA DO ID', );

    console.log('--- INICIANDO BUSCA ---');
    console.log('DTO RECEBIDO:', JSON.stringify(id, null, 2));    
    const professor = await this.prisma.professor.findFirst({where:{id}});
    if(!professor)
    {
      throw new NotFoundException(`Professor com ID "${id}" não encontrado`);
    }
    return professor;
  }

  async update(id: string, updateProfessorDto: UpdateProfessorDto): Promise<Professor> {
    console.log('DTO RECEBIDO NO SERVIÇO:', UpdateProfessorDto);

    console.log('--- INICIANDO UPDATE ---');
    console.log('DTO RECEBIDO:', JSON.stringify(UpdateProfessorDto, null, 2));
    const professor = await this.prisma.professor.findFirst({where:{id}});
    if(!professor)
    {
      throw new NotFoundException(`Professor com ID "${id}" não encontrado`);
    }
    return this.prisma.professor.update({data:updateProfessorDto, where:{id}});
  }

  async remove(id: string) {
    const professor = await this.prisma.professor.findFirst({where:{id}});
    if(!professor)
    {
      throw new NotFoundException(`Professor com ID "${id}" não encontrado`);
    }
    return this.prisma.professor.delete({where:{id},});
  }
}
