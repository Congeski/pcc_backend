import { Module } from '@nestjs/common';
import { PrismaService } from 'src/service/prisma.service';
import { SolicitacaoDefesaController } from './solicitacao-defesa.controller';
import { SolicitacaoDefesaService } from './solicitacao-defesa.service';

@Module({
  controllers: [SolicitacaoDefesaController],
  providers: [SolicitacaoDefesaService, PrismaService]
})
export class SolicitacaoDefesaModule {}
