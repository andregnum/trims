import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ACCESS_JWT } from '@/common/provider/jwt/access-jwt.provider';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(@Inject(ACCESS_JWT) private readonly jwtService: JwtService) {}

  private extractTokenFromHeader(req: Request): string | undefined {
    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(req);
    console.log(req);
    console.log(`Token: ${token}`);
    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    try {
      const payload = await this.jwtService.verifyAsync<object>(token);
      req['user'] = payload;
      return true;
    } catch (error) {
      console.log(`Error: `, error);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
