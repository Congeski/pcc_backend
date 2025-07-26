import { Module } from '@nestjs/common';
import { SolicitacaoDefesaController } from './solicitacao-defesa.controller';
import { SolicitacaoDefesaService } from './solicitacao-defesa.service';

@Module({
  controllers: [SolicitacaoDefesaController],
  providers: [SolicitacaoDefesaService]
})
export class SolicitacaoDefesaModule {}
