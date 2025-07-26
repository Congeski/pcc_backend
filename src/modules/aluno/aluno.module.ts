import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from 'src/service/prisma.service';
import { AlunoController } from './aluno.controller';
import { AlunoService } from './aluno.service';

@Module({
  imports: [AuthModule],
  controllers: [AlunoController],
  providers: [AlunoService, PrismaService],
})
export class AlunoModule {}