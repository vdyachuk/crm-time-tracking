import { IsDefined, IsNotEmpty, IsEmail, MinLength, Validate } from 'class-validator';
import { IsUserAlreadyExist } from '../../users/is-user-already-exist.validator';

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
    password: string;
}
