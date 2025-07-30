import { Module } from '@nestjs/common';
import { ProgramaPosGraduacaoService } from './programa-pos-graduacao.service';
import { ProgramaPosGraduacaoController } from './programa-pos-graduacao.controller';
import { PrismaService } from 'src/service/prisma.service';

@Module({
  controllers: [ProgramaPosGraduacaoController],
  providers: [ProgramaPosGraduacaoService, PrismaService],
})
export class ProgramaPosGraduacaoModule {}
