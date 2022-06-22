import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions } from 'typeorm';

import { User } from '@entities/user.entity';
import { UserUpdate } from './dto/user-update.dto';
import { Profile } from '@entities/profile.entity';
import { SignUpDto } from '@auth/dto/sign-up.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async create(data: SignUpDto): Promise<User> {
    const user = new User(data);

    await this.userRepository.save(user);

    const userProfile = new Profile({
      ...data,
      user,
    });

    await this.profileRepository.save(userProfile);

    const newUser = await this.userRepository.findOne({
      where: {
        id: user.id,
      },
      relations: ['profile'],
    });

    return newUser;
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
