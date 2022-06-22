import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../../shared/entities/user.entity';
import { ProfileController } from './profile/profile.controller';
import { UserService } from './users.service';
import { IsUserAlreadyExist } from './is-user-already-exist.validator';
import { Profile } from '../../shared/entities/profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile])],
  controllers: [ProfileController],
  providers: [UserService, IsUserAlreadyExist],
  exports: [UserService],
})
export class UserModule {}
