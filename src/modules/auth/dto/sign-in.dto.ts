import { IsDefined, IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class SignInDto {
  @IsDefined()
  @IsEmail()
  readonly email: string;

  @IsDefined()
  @IsNotEmpty()
  readonly password: string;
}
