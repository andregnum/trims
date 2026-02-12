import { Module } from '@nestjs/common';
import { ConfigModule as NestjsConfigModule } from '@nestjs/config';

@Module({
  imports: [
    NestjsConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
      validate: (cfg) => {
        const required = ['DATABASE_URL'];
        const missing = required.filter((key) => !cfg[key]);
        if (missing.length > 0) {
          throw new Error(
            `Missing environment variables: ${missing.join(', ')}`,
          );
        }

        return cfg;
      },
    }),
  ],
})
export class ConfigModule {}
