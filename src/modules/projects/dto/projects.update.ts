import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdateProjectDto {
  @ApiProperty({ description: 'Project Name', example: 'Esta' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Client ID', example: '9878f24c-6b96-43cd-a1c4-69c66c875827' })
  @IsUUID(4)
  @IsNotEmpty()
  clientId: string;

  @ApiProperty({
    type: String,
    isArray: true,
    example: ['9878f24c-6b96-43cd-a1c4-69c66c875827'],
    description: 'Array of performer ids',
  })
  @IsUUID(4, { each: true })
  performerIds: String[];
}
