import { Module } from '@nestjs/common';
import { AlunoService } from './aluno.service';
import { AlunoController } from './aluno.controller';
import { PrismaService } from '../service/prisma.service';

@Module({
  controllers: [AlunoController],
  providers: [AlunoService, PrismaService],
})
export class AlunoModule {}