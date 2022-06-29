import { Body, Controller, HttpCode, HttpStatus, Post, UseInterceptors } from '@nestjs/common';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { JwtInterceptor } from '@interseptors/jwt.interceptor';
import { TokenInterceptor } from '@interseptors/token.interceptor';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { UserInfo } from '@users/dto/users.response';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registration')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(TokenInterceptor)
  @ApiOkResponse({ type: UserInfo, description: 'Successfully created user' })
  @ApiBadRequestResponse({ description: 'Incorrect registration data.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  register(@Body() signUpDto: SignUpDto): Promise<UserInfo> {
    return this.authService.registration(signUpDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(TokenInterceptor, JwtInterceptor)
  async login(@Body() signInDto: SignInDto): Promise<UserInfo> {
    return this.authService.login(signInDto);
  }
}
