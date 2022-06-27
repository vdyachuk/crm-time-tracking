import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto {
  @ApiProperty({ example: 'Esta', description: 'name' })
  readonly name: string;
}
