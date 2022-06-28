import { ApiProperty } from '@nestjs/swagger';

export class ClientInput {
  @ApiProperty()
  public readonly name: string;
  @ApiProperty()
  public readonly id: string;
}
