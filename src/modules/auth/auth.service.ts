import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';

import { User } from '../../entities/user.entity';
import { SignUpDto } from './dto/sign-up.dto';
import { JwtPayload } from '../../interface/jwt-payload.interface';
import { UserService } from '../users/users.service';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

    async register(dto: SignUpDto): Promise<User> {
        const encryptedPassword = await this.encryptPassword(dto.password);

        dto.password = encryptedPassword;

        const user = await this.userService.create(dto);
        delete user.password;

        return user;
    }

    async login(dto: SignInDto): Promise<User> {
        let user: User;

        try {
            user = await this.userService.findOne({ where: { email: dto.email } });
        } catch (err) {
            throw new UnauthorizedException('Incorrect password or email');
        }

        if (!(await this.checkPassword(dto.password, user.password))) {
            throw new UnauthorizedException('Incorrect password or email');
        }
        delete user.password;

        return user;
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
            sub: user.email
        };

        return this.jwtService.sign(payload);
    }

    private async encryptPassword(plainPassword: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const iterations = 50000;
            const keylen = 64;
            const digest = 'sha512';
            const salt = crypto.randomBytes(16).toString('hex')

            crypto.pbkdf2(plainPassword, salt, iterations, keylen, digest, (err, derivedKey) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(salt + ':' + derivedKey.toString('hex'));
                }
            });
        });
    }

    private async checkPassword(password: string, encryptedPassword: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const [salt, key] = encryptedPassword.split(':');

            const iterations = 50000;
            const keylen = 64;
            const digest = 'sha512';

            crypto.pbkdf2(password, salt, iterations, keylen, digest, (err, derivedKey) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(key === derivedKey.toString('hex'));
                }
            });
        });
    }
}
