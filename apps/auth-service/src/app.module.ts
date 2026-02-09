import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module.js';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UserModule } from './user/user.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { LoggerModule } from 'nestjs-pino';
import { pinoConfig } from './config/pino.config.js';

function createLoggerModule(): ReturnType<typeof LoggerModule.forRoot> {
  return LoggerModule.forRoot(
    pinoConfig() as Parameters<typeof LoggerModule.forRoot>[0],
  );
}

@Module({
  imports: [ConfigModule, createLoggerModule(), PrismaModule, UserModule],
  exports: [createLoggerModule()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
