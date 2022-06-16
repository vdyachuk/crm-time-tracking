import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';

import { User } from '@entities/user.entity';

export class UserInfo {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  email: string;

  @ApiProperty()
  @Expose()
  name: string;

  public static mapFrom(user: User): UserInfo {
    return plainToClass(UserInfo, user, { excludeExtraneousValues: true });
  }
}
