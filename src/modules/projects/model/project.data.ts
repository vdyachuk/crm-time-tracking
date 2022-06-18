import { ApiProperty } from '@nestjs/swagger';

export class ProjectData {
  @ApiProperty({ description: 'Name', example: 'Esta' })
  public readonly name: string;
  @ApiProperty({ description: ' unique ID', example: '36asas635263' })
  public readonly id: string;
}
