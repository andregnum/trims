import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3001); // Port 3001 for user service
  console.log('🚀 User Service running on http://localhost:3001');
}
bootstrap();
