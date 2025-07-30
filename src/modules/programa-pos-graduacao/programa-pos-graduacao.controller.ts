import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsuarioIdFromToken } from 'src/decorators/usuarioId.decorator';
import { CreateProgramaPosGraduacaoDto } from './dto/create-programa-pos-graduacao.dto';
import { UpdateProgramaPosGraduacaoDto } from './dto/update-programa-pos-graduacao.dto';
import { ProgramaPosGraduacaoService } from './programa-pos-graduacao.service';

@UseGuards(JwtAuthGuard)
@Controller('programa-pos-graduacao')
export class ProgramaPosGraduacaoController {
  constructor(
    private readonly programaPosGraduacaoService: ProgramaPosGraduacaoService,
  ) {}

  @Post()
  @HttpCode(201)
  async create(
    @UsuarioIdFromToken() usuarioId: string,
    @Body() createDto: CreateProgramaPosGraduacaoDto,
  ) {
    console.log(usuarioId);
    return await this.programaPosGraduacaoService.create(usuarioId, createDto);
  }

  @Get()
  @HttpCode(200)
  async findAll() {
    return await this.programaPosGraduacaoService.findAll();
  }

  @Get('/:id')
  @HttpCode(200)
  async findOne(@Param('id') id: string) {
    return await this.programaPosGraduacaoService.findOne(id);
  }

  @Patch('/:id')
  @HttpCode(200)
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateProgramaPosGraduacaoDto,
  ) {
    return await this.programaPosGraduacaoService.update(id, updateDto);
  }

  @Patch('/:id')
  @HttpCode(200)
  async deactivate(@Param('id') id: string) {
    return await this.programaPosGraduacaoService.deactivate(id);
  }
}
