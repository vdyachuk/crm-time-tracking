import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

import { AccountService } from '../../modules/account/account.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly accountService: AccountService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const accessToken = request?.headers?.authorization;

    if (!accessToken) {
      return false;
    }

    const user = await this.accountService.getCurrentUser(accessToken.replace('Bearer ', ''));

    if (user?._id) {
      return true;
    }

    return false;
  }
}
