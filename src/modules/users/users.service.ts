import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions, MoreThanOrEqual } from 'typeorm';
import { CurrentUser } from '../../interface/current.user';

import { User } from '@entities/user.entity';
import { UserUpdate } from './dto/user-update.dto';
import * as moment from 'moment';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository,
    private user: Repository<User>,
    private jwtService: JwtService,
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
  public async getJwtToken(user: CurrentUser): Promise<string> {
    const payload = {
      ...user,
    };
    return this.jwtService.signAsync(payload);
  }

  public async getRefreshToken(id: number): Promise<string> {
    const userDataToUpdate = {
      refreshToken: process.env.JWT_REFRESH_TOKEN_SECRET,
      refreshTokenExp: moment().day(1).format('YYYY/MM/DD'),
    };

    await this.user.update(id, userDataToUpdate);
    return userDataToUpdate.refreshToken;
  }

  public async validRefreshToken(email: string, refreshToken: string): Promise<CurrentUser> {
    const currentDate = moment().day(1).format('YYYY/MM/DD');
    const user = await this.user.findOne({
      where: {
        email: email,
        refreshToken: refreshToken,
        refreshTokenExp: MoreThanOrEqual(currentDate),
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
