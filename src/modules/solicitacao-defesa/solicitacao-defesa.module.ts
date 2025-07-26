import { Module } from '@nestjs/common';
import { PrismaService } from 'src/service/prisma.service';
import { SolicitacaoDefesaController } from './solicitacao-defesa.controller';
import { SolicitacaoDefesaService } from './solicitacao-defesa.service';
import { UploadService } from 'src/service/upload.service';

@Module({
  controllers: [SolicitacaoDefesaController],
  providers: [SolicitacaoDefesaService, PrismaService, UploadService]
})
export class SolicitacaoDefesaModule {}
