import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from '@auth/auth.service';
import { SignInDto } from '@auth/dto/sign-in.dto';
import { UserInfo } from '@users/dto/users.response';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passReqToCallback: false,
    });
  }

  validate(signInDto: SignInDto): Promise<UserInfo> {
    return this.authService.login(signInDto);
  }
}
