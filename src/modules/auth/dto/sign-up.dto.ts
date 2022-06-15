import { IsDefined, IsNotEmpty, IsEmail, MinLength, Validate, Matches } from 'class-validator';

import { IsUserAlreadyExist } from '@users/is-user-already-exist.validator';
import { Match } from '@auth/decorators/match.decorator';

export class SignUpDto {
  @IsDefined()
  @IsNotEmpty()
  readonly name: string;

  @IsDefined()
  @IsEmail()
  @Validate(IsUserAlreadyExist)
  readonly email: string;

  @IsDefined()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password too weak' })
  password: string;

  @IsDefined()
  @IsNotEmpty()
  @MinLength(8)
  @Match('password')
  passwordConfirm: string;
}
