import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '@/users/users.service';
import { LoginDto, RegisterDto, TokenDto } from '@/auth/dto';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ACCESS_JWT } from '@/provider/jwt/access-jwt.provider';
import { REFRESH_JWT } from '@/provider/jwt/refresh-jwt.provider';

@Injectable()
export class AuthService {
  constructor(
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
