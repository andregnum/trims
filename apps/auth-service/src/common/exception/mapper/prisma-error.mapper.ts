import {
  Injectable,
  BadRequestException,
  ConflictException,
  HttpException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ErrorMapper } from '../interface/error-mapper.interface.js';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/client';

@Injectable()
export class PrismaErrorMapper implements ErrorMapper {
  map(error: unknown): HttpException {
    if (error instanceof PrismaClientKnownRequestError) {
      switch (error.code) {
        case 'P2002':
          return new ConflictException('Unique constraint failed');
        case 'P2025':
          return new NotFoundException('Record not found');
        case 'P2003':
          return new BadRequestException('Invalid relation reference');
        default:
          return new BadRequestException('Database error');
      }
    }
    if (error instanceof PrismaClientValidationError) {
      return new BadRequestException('Invalid query');
    }

    return new InternalServerErrorException('Unexpected error');
  }
}
