import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { CookieEnums } from 'src/common/enums/cookies';
import { Response } from 'express';
import { User } from 'src/entities/user.entity';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '@auth/auth.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtInterceptor implements NestInterceptor {
  constructor(private readonly authService: AuthService, private readonly config: ConfigService) {}

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const httpArgumentHost = context.switchToHttp();
    const response = httpArgumentHost.getResponse<Response>();

    return next.handle().pipe(
      map(async ({ user }: { user: User }) => {
        const accessToken = await this.authService.getJwtToken(user);
        const refreshToken = await this.authService.getRefreshToken(user.id);

        response.cookie(CookieEnums.Access, accessToken, {
          httpOnly: true,
          domain: this.config.get('app.cookieDomain'),
        });

        response.cookie(CookieEnums.Refresh, refreshToken, {
          httpOnly: true,
          domain: this.config.get('app.cookieDomain'),
        });
        return { token: accessToken, user };
      }),
    );
  }
}
