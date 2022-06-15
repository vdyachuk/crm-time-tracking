import { ApiProperty } from '@nestjs/swagger';

export class ProjectInput {
  @ApiProperty()
  public readonly name: string;
}
