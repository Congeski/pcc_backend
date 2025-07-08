import { Module } from '@nestjs/common';
import { AlunoService } from './aluno.service';
import { AlunoController } from './aluno.controller';
import { PrismaService } from '../service/prisma.service';
import { AuthModule } from 'src/auth/auth.module'; 

@Module({
  imports: [AuthModule],
  controllers: [AlunoController],
  providers: [AlunoService, PrismaService],
})
export class AlunoModule {}