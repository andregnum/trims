import { ConfigService } from '@nestjs/config';
import { JwtService, JwtModuleOptions } from '@nestjs/jwt';

export const REFRESH_JWT = 'REFRESH_JWT';

export const RefreshJwtProvider = {
  provide: REFRESH_JWT,
  inject: [ConfigService],
  useFactory: (config: ConfigService) => {
    const opts: JwtModuleOptions = {
      secret: config.get('JWT_REFRESH_SECRET'),
      signOptions: { expiresIn: config.get('JWT_REFRESH_EXPIRES_IN') || 8 * 60 * 60 * 1000 },
    };

    return new JwtService(opts);
  },
};
