import { Module } from '@nestjs/common';
import { AuthController } from './modules/auth/auth.controller';
import { UserController } from './modules/user/user.controller';

@Module({
  controllers: [AuthController, UserController],
})
export class AppModule {}
