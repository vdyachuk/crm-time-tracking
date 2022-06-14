import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '../../entities/user.entity';
import { SignUp } from './dto/sign-up.dto';
import { JwtPayload } from '../../interface/jwt-payload.interface';
import { UserService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async register(dto: SignUp): Promise<User> {
        const user = await this.userService.create(dto);
        delete user.password;

        return user;
    }

    async login(email: string, password: string, salt: string): Promise<User> {
        let user: User;

        try {
            user = await this.userService.findOne({ where: { email } });
        } catch (err) {
            throw new UnauthorizedException(`Incorrect password or email: ${email}`);
        }

        if (!(await user.checkPassword(password, salt))) {
            throw new UnauthorizedException(`Incorrect password or email: ${email}`);
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
            sub: user.email,
        };

        return this.jwtService.sign(payload);
    }
}
