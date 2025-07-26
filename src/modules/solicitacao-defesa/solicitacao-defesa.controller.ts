import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateSolicitacaoDefesaDto } from './dto/create-solicitacao-defesa.dto';
import { SolicitacaoDefesaService } from './solicitacao-defesa.service';
import { UserAccess } from 'src/auth/auth.service';

@Controller('solicitacao-defesa')
export class SolicitacaoDefesaController {
  constructor(private readonly service: SolicitacaoDefesaService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(201)
  async create(
    @Req() req: UserAccess,
    @Body() dto: CreateSolicitacaoDefesaDto,
  ) {
    const userId = req.usuario_id;
    return this.service.create(userId, dto);
  }
}
