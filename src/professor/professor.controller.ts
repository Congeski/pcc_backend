import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, UseGuards, BadRequestException, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { error } from 'console';








@Controller('professor')
@UsePipes(new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
  exceptionFactory: (errors) => {
    const result = errors.map((error) => ({
      property: error.property,
      constraints: error.constraints,
      children: error.children,
    }));
    return new BadRequestException(result);
  },
}))
export class ProfessorController {
  constructor(private readonly professoresService: ProfessorService) {}
  
  
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createProfessoreDto: CreateProfessorDto) {
    try {
      return await this.professoresService.create(createProfessoreDto);  
    } catch (error) {
      console.log(error.message);
      throw new BadRequestException(error.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()  
  async findAll() {
    try{
    return await this.professoresService.findAll();
    }catch(error){
      console.log(error.message);
      throw new BadRequestException(error.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.professoresService.findOne(id);
    } catch (error) {
      console.log(error.message);
      throw new BadRequestException(error.message);
    }
  }
  
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProfessoreDto: UpdateProfessorDto) {
    return await this.professoresService.update(id, updateProfessoreDto);
  }

  @UseGuards(JwtAuthGuard)
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
