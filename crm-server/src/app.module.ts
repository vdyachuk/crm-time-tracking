import { Module } from '@nestjs/common';
import { AuthController } from './modules/auth/auth.controller';
import { UserController } from './modules/user/user.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmOptions } from './config/config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [getTypeOrmOptions],
    }),
    TypeOrmModule.forRoot(getTypeOrmOptions()),
  ],
  controllers: [AuthController, UserController],
})
export class AppModule {}
