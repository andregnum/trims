import { Module } from '@nestjs/common';
import { AuthController } from '@/auth/auth.controller';
import { AuthService } from '@/auth/auth.service';
import { UsersModule } from '@/users/users.module';
import { UsersService } from '@/users/users.service';
import { AccessJwtProvider } from './../provider/jwt/access-jwt.provider';
import { RefreshJwtProvider } from '@/provider/jwt/refresh-jwt.provider';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [AccessJwtProvider, RefreshJwtProvider, AuthService, UsersService],
  // exports: [AccessJwtProvider, RefreshJwtProvider],
})
export class AuthModule {}
