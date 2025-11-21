import { Module } from '@nestjs/common';
import { UserService } from '../user/user.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { UserRepository } from './repository/user.repository.js';
import { UserController } from './user.controller.js';

@Module({
  providers: [
    UserService,
    PrismaService,
    { provide: 'UserRepository', useClass: UserRepository },
  ],
  controllers: [UserController],
})
export class UserModule {}
