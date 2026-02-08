import { Module } from '@nestjs/common';
import { ConfigModule as NestjsConfigModule } from '@nestjs/config';

@Module({
  imports: [
    NestjsConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
      validate: (config) => {
        const required = ['DATABASE_URL'];
        const missing = required.filter((key) => !config[key]);

        if (missing.length > 0) {
          throw new Error(
            `Missing environment variables: ${missing.join(', ')}`,
          );
        }

        return config;
      },
    }),
  ],
})
export class ConfigModule {}
