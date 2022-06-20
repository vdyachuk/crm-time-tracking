import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { CurrentUser } from '../../interface/user.interface';

import { User } from '@entities/user.entity';
import { UserUpdate } from './dto/user-update.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository,
    private user: Repository<User>,
  ) {}

  async create(data: Partial<User>): Promise<User> {
    return this.userRepository.save(new User(data));
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
  public async validRefreshToken(email: string, refreshToken: string): Promise<CurrentUser> {
    const user = await this.user.findOne({
      where: {
        email: email,
        refreshToken: refreshToken,
      },
    });

    if (!user) {
      return null;
    }

    const currentUser = new CurrentUser();
    currentUser.id = user.id;
    currentUser.name = user.name;
    currentUser.email = user.email;

    return currentUser;
  }
}
