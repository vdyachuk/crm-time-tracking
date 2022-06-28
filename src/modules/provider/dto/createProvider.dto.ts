import { UserProviderEnum } from '@enums/user';

export class CreateProviderDto {
  type?: UserProviderEnum;

  userId?: string;

  oid: string;
}
