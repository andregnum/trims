import { HttpException } from '@nestjs/common';

export interface ErrorMapper {
  map(error: unknown): HttpException;
}
