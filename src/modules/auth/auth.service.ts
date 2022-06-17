import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as util from 'util';
import * as crypto from 'crypto';

import { User } from '@entities/user.entity';
import { SignUpDto } from './dto/sign-up.dto';
import { JwtPayload } from '../../interface/jwt-payload.interface';
import { UserService } from '@users/users.service';
import { SignInDto } from './dto/sign-in.dto';
import { UserInfo } from '@users/dto/response-user.dto';

const encryptIterations = 50000;
const encryptKeylen = 64;
const encryptDigest = 'sha512';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async registration(dto: SignUpDto): Promise<UserInfo> {
    const encryptedPassword = await this.encryptPassword(dto.password);

    dto.password = encryptedPassword;

    try {
      const user = await this.userService.create(dto);

      return UserInfo.mapFrom(user);
    } catch (_) {
      throw new InternalServerErrorException('Internal server error');
    }
  }

  async login(dto: SignInDto): Promise<UserInfo> {
    const user: User = await this.userService.findOne({ where: { email: dto.email } });
    if (!user) {
      throw new UnauthorizedException('Incorrect password or email');
    }

    if (!(await this.checkPassword(dto.password, user.password))) {
      throw new UnauthorizedException('Incorrect password or email');
    }

    return UserInfo.mapFrom(user);
  }

  async verifyPayload(payload: JwtPayload): Promise<User> {
    let user: User;

    try {
      user = await this.userService.findOne({ where: { email: payload.sub } });
    } catch (error) {
      throw new UnauthorizedException(`There isn't any user with email: ${payload.sub}`);
    }
    delete user.password;

    return user;
  }

  signToken(user: User): string {
    const payload = {
      sub: user.email,
    };

    return this.jwtService.sign(payload);
  }

  private async encryptPassword(plainPassword: string): Promise<string> {
    const salt = crypto.randomBytes(16).toString('hex');

    const crypt = util.promisify(crypto.pbkdf2);

    const encryptedPassword = await crypt(plainPassword, salt, encryptIterations, encryptKeylen, encryptDigest);

    return salt + ':' + encryptedPassword.toString('hex');
  }

  private async checkPassword(password: string, existPassword: string): Promise<boolean> {
    const [salt, key] = existPassword.split(':');

    const crypt = util.promisify(crypto.pbkdf2);

    const encryptedPassword = await crypt(password, salt, encryptIterations, encryptKeylen, encryptDigest);
    return key === encryptedPassword.toString('hex');
  }
}
