import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { UserController } from './user/user.controller';

@Module({
  controllers: [AuthController, UserController],
})
export class AppModule {}
