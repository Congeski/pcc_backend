import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AlunoModule } from './modules/aluno/aluno.module';
import { ProfessorModule } from './modules/professor/professor.module';
import { SolicitacaoDefesaModule } from './modules/solicitacao-defesa/solicitacao-defesa.module';
import { ProgramaPosGraduacaoModule } from './modules//programa-pos-graduacao/programa-pos-graduacao.module';
import { EmailModule } from './modules/email/email.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    AlunoModule,
    ProfessorModule,
    SolicitacaoDefesaModule,
    ProgramaPosGraduacaoModule,
    EmailModule,
  ],
})
export class AppModule {}
