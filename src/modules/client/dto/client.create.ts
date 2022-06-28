import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ClientCreateDto {
  @ApiProperty({ description: 'Client Name', example: 'Alex' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
