import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from 'src/modules/auth/auth.service';
import { User } from 'src/entities/user.entity';
import { SignInDto } from 'src/modules/auth/dto/sign-in.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passReqToCallback: false,
    });
  }

    validate(signInDto: SignInDto): Promise<User> {
        return this.authService.login(signInDto);
    }
}
