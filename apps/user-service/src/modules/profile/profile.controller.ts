import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '@/modules/auth/guard/jwt-auth.guard';

@Controller('profile')
export class ProfileController {
  @Get()
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req) {
    return {
      id: req.user.sub,
      email: req.user.email,
      message: 'Protected route accessed successfulyy!',
    };
  }
}
