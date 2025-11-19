import { ConfigService } from '@nestjs/config';
import { JwtService, JwtModuleOptions } from '@nestjs/jwt';

export const ACCESS_JWT = 'ACCESS_JWT';

export const AccessJwtProvider = {
  provide: ACCESS_JWT,
  inject: [ConfigService],
  useFactory: (config: ConfigService) => {
    const opts: JwtModuleOptions = {
      secret: config.get('JWT_ACCESS_SECRET'),
      signOptions: { expiresIn: config.get('JWT_ACCESS_EXPIRES_IN') || 15 * 60 * 1000 },
    };

    return new JwtService(opts);
  },
};
