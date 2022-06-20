import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../modules/users/users.service';
import { configService } from 'src/config/config.service/refresh.strategy';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(private userService: UserService) {
    super({
      ignoreExpiration: true,
      passReqToCallback: true,
      secretOrKey: configService.getAppSecret(),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken([
        (request: Request) => {
          const data = request?.cookies['auth-cookie'];
          if (!data) {
            return null;
          }
          return data.token;
        },
      ]),
    });
  }

  async validate(req: Request, payload: any) {
    if (!payload) {
      throw new BadRequestException('invalid jwt token');
    }
    const data = req?.cookies['auth-cookie'];
    if (!data?.refreshToken) {
      throw new BadRequestException('invalid refresh token');
    }
    const user = await this.userService.validRefreshToken(payload.email, data.refreshToken);
    if (!user) {
      throw new BadRequestException('token expired');
    }

    return user;
  }
}
