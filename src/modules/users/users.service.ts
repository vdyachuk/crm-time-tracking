import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';

import { User } from '@entities/user.entity';
import { UserUpdate } from './dto/users.update';
import { Profile } from '@entities/profile.entity';

import { SignUpDto } from '@auth/dto/sign-up.dto';
import { UserSignUpInterface } from '@interface/user/user.sign-up.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async create(data: UserSignUpInterface): Promise<User> {
    const userProfile = new Profile();
    userProfile.firstName = data.firstName;
    userProfile.lastName = data.lastName;

    await this.profileRepository.save(userProfile);

    const user = new User();
    user.password = data.password ?? data.password;
    user.email = data.email;
    user.profile = userProfile;
    user.userProviders = data.userProviders;

    return await this.userRepository.save(user);
  }

  async findOne(where: FindOneOptions<User>): Promise<User> {
    const user = await this.userRepository.findOne(where);

    if (!user) {
      throw new NotFoundException(`There isn't any user with identifier: ${where}`);
    }

    return user;
  }

  async update(id: number, updates: UserUpdate): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`There isn't any user with id: ${id}`);
    }
    Object.assign(user, updates);

    return this.userRepository.save(user);
  }
}
