import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsuarioIdFromToken } from 'src/decorators/usuarioId.decorator';
import { CreateSolicitacaoDefesaDto } from './dto/create-solicitacao-defesa.dto';
import { SolicitacaoDefesaService } from './solicitacao-defesa.service';
import { StatusSolicitacao } from '@prisma/client';

@Controller('solicitacao-defesa')
export class SolicitacaoDefesaController {
  constructor(private readonly service: SolicitacaoDefesaService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(201)
  @UseInterceptors(FilesInterceptor('pdf'))
  async create(
    @UploadedFiles() pdf: Express.Multer.File[],
    @UsuarioIdFromToken() usuarioId: string,
    @Body() dto: CreateSolicitacaoDefesaDto,
  ) {
    return this.service.createSolicitacaoDefesa(usuarioId, dto, pdf);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(200)
  async getAllSolicitacaoDefesa(@UsuarioIdFromToken() usuarioId: string) {
    return this.service.getAllSolicitacaoDefesa(usuarioId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  @HttpCode(200)
  async getSolicitacaoDefesa(@Param('id') solicitacaoId: string) {
    return this.service.getSolicitacaoDefesa(solicitacaoId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/alterar-status/:id')
  @HttpCode(200)
  async alterarStatusSolicitacaoDefesa(
    @Param('id') solicitacaoId: string,
    @Body('status') status: StatusSolicitacao,
    @Body('justificativa') justificativa?: string,
  ) {
    return this.service.aprovarRejeitarSolicitacao(
      solicitacaoId,
      status,
      justificativa,
    );
  }
}
