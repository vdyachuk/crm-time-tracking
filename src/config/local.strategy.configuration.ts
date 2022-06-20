import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from '@auth/auth.service';
import { SignInDto } from '@auth/dto/sign-in.dto';
import { UserInfo } from '@users/dto/response-user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passReqToCallback: false,
    });
  }

  validate(signInDto: SignInDto, res: any, req: any): Promise<UserInfo> {
    return this.authService.login(signInDto, res, req);
  }
}
