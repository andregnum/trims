import { Module } from '@nestjs/common';
import { AuthController } from '@/modules/auth/auth.controller';
import { AuthService } from '@/modules/auth/auth.service';
import { UsersModule } from '@/modules/users/users.module';
import { UsersService } from '@/modules/users/users.service';
import { AccessJwtProvider } from '../../common/provider/jwt/access-jwt.provider';
import { RefreshJwtProvider } from '@/common/provider/jwt/refresh-jwt.provider';
import { PrismaService } from '@/common/prisma/prisma.service';
import { TokenModule } from './token/token.module';

@Module({
  imports: [UsersModule, TokenModule],
  controllers: [AuthController],
  providers: [PrismaService, AccessJwtProvider, RefreshJwtProvider, AuthService, UsersService],
  exports: [AccessJwtProvider, RefreshJwtProvider],
})
export class AuthModule {}
