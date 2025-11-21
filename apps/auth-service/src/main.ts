import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true, // Ensures logs are not lost before DI is ready.
  });

  app.useLogger(logger);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
