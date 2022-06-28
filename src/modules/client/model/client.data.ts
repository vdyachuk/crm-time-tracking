import { ApiProperty } from '@nestjs/swagger';

export class ClientData {
  @ApiProperty({ description: 'ClientName', example: 'Alex' })
  public readonly name: string;
  @ApiProperty({ description: ' unique ID', example: '36635263' })
  public readonly id: string;
}
