import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass, Type } from 'class-transformer';

import { Client, Project } from '@entities/index';
import { UserInfo } from '@users/dto/users.response';

export class ProjectResponseDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty({ type: Client })
  @Expose()
  @Type(() => Client)
  client: Client;

  @ApiProperty({ type: UserInfo, isArray: true })
  @Expose()
  @Type(() => UserInfo)
  users: UserInfo[];

  public static mapFrom(data: Project): ProjectResponseDto {
    const { client } = data;
    const users = UserInfo.mapFromMulti(data.users);
    const project = plainToClass(ProjectResponseDto, data, { excludeExtraneousValues: true });

    return { ...project, client, users };
  }
}
