import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class ClientUpdateDto {
  @ApiProperty({ description: 'Client Name', example: 'Alex' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
