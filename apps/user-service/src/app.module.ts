import { Module } from '@nestjs/common';
import { TestController } from './test-typescript';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, AuthModule],
  controllers: [TestController],
  providers: [],
})
export class AppModule {}
