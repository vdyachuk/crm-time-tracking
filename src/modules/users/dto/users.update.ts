import { IsDefined, IsString, IsNotEmpty } from 'class-validator';

export class UserUpdateDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  readonly name;
}
