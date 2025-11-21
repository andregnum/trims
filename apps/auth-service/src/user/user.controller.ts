import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UserService } from './user.service.js';
import { User } from '../../generated/prisma/client.js';
import { PrismaClientUnknownRequestError } from '@prisma/client/runtime/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Post('create-user')
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.userService.create(createUserDto);
    } catch (error) {
      if (error instanceof PrismaClientUnknownRequestError) {
        throw new BadRequestException('Database error occurred');
      }
      throw error;
    }
  }
}
