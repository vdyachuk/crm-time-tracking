import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass, Type } from 'class-transformer';

import { Client } from '@entities/index';

export class ClientResponseDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  name: string;

  public static mapFrom(data: Client): ClientResponseDto {
    const client = plainToClass(ClientResponseDto, data, { excludeExtraneousValues: true });

    return { ...client };
  }

  public static mapFromMulti<P>(data: Client[]): ClientResponseDto[] {
    return data.map(ClientResponseDto.mapFrom);
  }
}
