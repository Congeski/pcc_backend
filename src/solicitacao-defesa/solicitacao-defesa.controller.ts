// src/solicitacao-defesa/solicitacao-defesa.controller.ts
import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { SolicitacaoDefesaService } from './solicitacao-defesa.service';
import { CreateSolicitacaoDefesaDto } from './dto/create-solicitacao-defesa.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
// import { AuthGuard } from '../auth/auth.guard'; // exemplo

@Controller('solicitacao-defesa')
// @UseGuards(AuthGuard) // se estiver usando autenticação
export class SolicitacaoDefesaController {
  constructor(private readonly service: SolicitacaoDefesaService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() req: any, @Body() dto: CreateSolicitacaoDefesaDto) {
    const userId = req.user?.id; // substituir isso pelo ID do usuário logado
    return this.service.create(userId, dto);
  }
}
