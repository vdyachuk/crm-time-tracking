import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';

import { Project } from 'src/shared/entities';

export class ProjectResponseDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  name: string;

  public static mapFrom(data: Project): ProjectResponseDto {
    return plainToClass(ProjectResponseDto, data, { excludeExtraneousValues: true });
  }
}
