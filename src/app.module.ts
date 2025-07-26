import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AlunoModule } from './modules/aluno/aluno.module';
import { ProfessorModule } from './modules/professor/professor.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AlunoModule,
    ProfessorModule,
    AuthModule,
  ],
})
export class AppModule {}
