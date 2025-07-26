import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AlunoService } from './aluno.service';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';

@Controller('aluno')
export class AlunoController {
  constructor(private readonly alunoService: AlunoService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(201)
  async create(@Body() createAlunoDto: CreateAlunoDto) {
    return await this.alunoService.create(createAlunoDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(200)
  async findAll() {
    return await this.alunoService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  @HttpCode(200)
  async findOne(@Param('id') id: string) {
    return await this.alunoService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  @HttpCode(200)
  async update(
    @Param('id') id: string,
    @Body() updateAlunoDto: UpdateAlunoDto,
  ) {
    return await this.alunoService.update(id, updateAlunoDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return await this.alunoService.remove(id);
  }
}