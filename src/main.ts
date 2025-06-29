import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create<any>(AppModule, { cors: true });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.setGlobalPrefix('pcc');

  await app.listen(PORT, () => {
    console.log(`🚀 Backend está rodando na porta ${PORT}`);
  });
}
bootstrap();
