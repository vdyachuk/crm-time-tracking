import { IsDefined, IsNotEmpty, IsEmail, MinLength, Validate, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { IsUserAlreadyExist } from '@users/is-user-already-exist.validator';
import { Match } from '@auth/decorators/match.decorator';

export class SignUpDto {
  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  readonly firstName: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  readonly lastName: string;

  @ApiProperty()
  @IsDefined()
  @IsEmail()
  @Validate(IsUserAlreadyExist)
  readonly email: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password too weak' })
  password: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @MinLength(8)
  @Match('password')
  passwordConfirm: string;
}
