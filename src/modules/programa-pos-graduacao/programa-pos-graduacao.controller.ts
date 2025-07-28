import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ProgramaPosGraduacaoService } from './programa-pos-graduacao.service';
import { CreateProgramaPosGraduacaoDto } from './dto/create-programa-pos-graduacao.dto';
import { UpdateProgramaPosGraduacaoDto } from './dto/update-programa-pos-graduacao.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

// Protege todas as rotas deste controller, exigindo autenticação JWT
@UseGuards(JwtAuthGuard)
@Controller('programa-pos-graduacao') // Define o endpoint base: /programa-pos-graduacao
export class ProgramaPosGraduacaoController {
  constructor(
    private readonly programaPosGraduacaoService: ProgramaPosGraduacaoService,
  ) {}

  @Post()
  create(@Body() createDto: CreateProgramaPosGraduacaoDto) {
    return this.programaPosGraduacaoService.create(createDto);
  }

  @Get()
  findAll() {
    return this.programaPosGraduacaoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.programaPosGraduacaoService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateProgramaPosGraduacaoDto,
  ) {
    return this.programaPosGraduacaoService.update(id, updateDto);
  }

  @Delete(':id')
  deactivate(@Param('id') id: string) {
    return this.programaPosGraduacaoService.deactivate(id);
  }
}