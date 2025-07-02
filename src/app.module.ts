import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfessorModule } from './professor/professor.module';


@Module({
  imports: [ProfessorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
