import { Module } from '@nestjs/common';
import { AuthController } from './modules/auth/auth.controller';
import { UserController } from './modules/user/user.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './shared/typeorm/typeorm.service';
import { getEnvPath } from './common/helper/env.helper';
import { getTypeOrmOptions } from './config/config.service';

const envFilePath = getEnvPath(`${__dirname}/common/envs`);

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
