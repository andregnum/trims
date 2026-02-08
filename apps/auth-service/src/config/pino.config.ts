import { Params } from 'nestjs-pino';
import { randomUUID } from 'crypto';
import type { IncomingMessage } from 'http';

export function pinoConfig(): Params {
  const isProd = process.env.NODE_ENV === 'production';

  return {
    pinoHttp: {
      level: isProd ? 'info' : 'debug',
      genReqId: (req: IncomingMessage) =>
        (req.headers['x-request-id'] || randomUUID()) as string,
      redact: {
        paths: ['req.headers.authorization', 'res.headers.cookie'],
        censor: '***REDACTED***',
      },
      base: {
        service: 'auth-service',
      },
      transport: isProd
        ? {
            target: 'pino/file',
            options: {
              destination: './logs/auth-service.log',
            },
          }
        : {
            target: 'pino-pretty',
            options: {
              colorize: true,
              translateTime: 'SYS:standard',
              singleLine: true,
            },
          },
    },
  };
}
