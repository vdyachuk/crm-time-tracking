import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass, Type } from 'class-transformer';

import { User } from '@entities/user.entity';
import { Profile } from '@entities/profile.entity';

export class UserInfo {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  email: string;

  @ApiProperty({ type: Profile })
  @Expose()
  @Type(() => Profile)
  profile: Profile;

  public static mapFrom(data: User): UserInfo {
    const { profile } = data;
    const user = plainToClass(UserInfo, data, { excludeExtraneousValues: true });

    return { ...user, profile };
  }
}
