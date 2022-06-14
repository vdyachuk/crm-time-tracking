import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from 'src/modules/auth/auth.service';
import { User } from 'src/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
    constructor(private readonly authService: AuthService) {
        super({
            usernameField: 'email',
            passReqToCallback: false
        });
    }

    validate(email: string, password: string, salt: string): Promise<User> {
        return this.authService.login(email, password, salt);
    }
}
