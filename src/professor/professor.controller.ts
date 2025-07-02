import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';

@Controller('professor')
export class ProfessorController {
  constructor(private readonly professoresService: ProfessorService) {}

  @Post()
  create(@Body() createProfessoreDto: CreateProfessorDto) {
    return this.professoresService.create(createProfessoreDto);
  }

  @Get()
  async findAll() {
    return await this.professoresService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.professoresService.findOne(id);
    } catch (error) {
      if(error instanceof NotFoundException){
        throw new NotFoundException(error.message);
      }
      throw error;
      
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProfessoreDto: UpdateProfessorDto) {
    return await this.professoresService.update(id, updateProfessoreDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try 
    {
      return await this.professoresService.remove(id);
    } 
    catch (error) {
      if(error instanceof NotFoundException)
      {
        throw new NotFoundException(error.message);
      }
      throw error;      
    }
  }
}
