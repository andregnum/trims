import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '@/modules/users/users.service';
import { LoginDto, RegisterDto, TokenDto } from '@/modules/auth/dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ACCESS_JWT } from '@/common/provider/jwt/access-jwt.provider';
import { REFRESH_JWT } from '@/common/provider/jwt/refresh-jwt.provider';
import { TokenType } from 'generated/prisma/enums';
import { PrismaService } from '@/common/prisma/prisma.service';
import { UserActiveToken } from '@generated/prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
    private readonly usersService: UsersService,
    @Inject(ACCESS_JWT) private readonly jwtAccess: JwtService,
    @Inject(REFRESH_JWT) private readonly jwtRefresh: JwtService,
  ) {}

  createAccessToken(payload: any) {
    return this.jwtAccess.sign(payload);
  }

  createRefreshToken(payload: any) {
    return this.jwtRefresh.sign(payload);
  }

  async register(registerDto: RegisterDto) {
    return this.usersService.create(registerDto);
  }

  async storeToken<T extends UserActiveToken>(
    users: Omit<T, 'id' | 'tokenHash' | 'createdAt' | 'type' | 'expiresAt'>,
    newToken: string,
    type: TokenType,
  ) {
    const tokenHash = await bcrypt.hash(newToken, parseInt(this.config.get('BCRYPT_ROUNDS')) || 12);
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await this.prisma.userActiveToken.create({
      data: {
        userId: users.userId,
        tokenHash,
        type,
        userAgent: users.userAgent ?? null,
        ipAddress: users.ipAddress ?? null,
        expiresAt,
      },
    });
  }

  async login(loginDto: LoginDto): Promise<TokenDto> {
    const { email, password } = loginDto;

    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const token = this.generateTokens(user.id, user.email);

    await this.storeToken(
      {
        userId: user.id,
        userAgent: 'none',
        ipAddress: 'none',
      },
      token.refreshToken,
      TokenType.REFRESH,
    );

    return token;
  }

  private generateTokens(id: string, email: string): TokenDto {
    const payload = { sub: id, email };

    return {
      accessToken: this.createAccessToken(payload),
      refreshToken: this.createRefreshToken(payload),
    };
  }
}
