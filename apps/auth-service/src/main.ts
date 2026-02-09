import { NestFactory } from '@nestjs/core';
import { type MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module.js';
import { Logger } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { pinoConfig } from './config/pino.config.js';
import { ConfigService } from '@nestjs/config';
import { cfgNum, cfgStr } from './util/config-service.util.js';

function createLoggerModule(): ReturnType<typeof LoggerModule.forRoot> {
  return LoggerModule.forRoot(
    pinoConfig() as Parameters<typeof LoggerModule.forRoot>[0],
  );
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true, // Ensures logs are not lost before DI is ready.
  });

  const configService = app.get(ConfigService);
  const logger = app.get(createLoggerModule().module[0] as typeof Logger);

  app.useLogger(logger);

  // Setup microservice
  app.connectMicroservice<MicroserviceOptions>({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access --- IGNORE ---
    transport: Transport.TCP,
    options: {
      host: cfgStr(configService, 'SERVICE_HOST', '0.0.0.0'),
      port: cfgNum(configService, 'SERVICE_PORT', 3001),
    },
  });

  // Setup http (OAuth callbacks)
  const httpPort = cfgNum(configService, 'HTTP_PORT', 3000);
  await app.listen(httpPort);

  await app.startAllMicroservices();

  logger.log(`🚀 Auth service is listening on port ${httpPort}`);
  logger.log(
    `🚀 Auth microservice is listening on port ${cfgNum(
      configService,
      'SERVICE_PORT',
      3001,
    )}`,
  );

  // await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
