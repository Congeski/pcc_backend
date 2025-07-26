import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfessorModule } from './professor/professor.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AlunoModule } from './aluno/aluno.module';


@Module({
  imports: [AlunoModule,ProfessorModule, AuthModule,ConfigModule.forRoot({isGlobal:true})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
