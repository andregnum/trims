import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { JwtAuthGuard } from '@/modules/auth/guard/jwt-auth.guard';
import { AccessJwtProvider } from '@/common/provider/jwt/access-jwt.provider';

@Module({
  controllers: [ProfileController],
  providers: [JwtAuthGuard, AccessJwtProvider],
})
export class ProfileModule {}
