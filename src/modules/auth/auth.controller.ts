import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { AuthUser } from '@users/users.decorator';
import { User } from '@entities/user.entity';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { JWTAuthGuard } from './guards/jwt-auth.guard';
import { SessionAuthGuard } from './guards/session-auth.guard';
import { SignInDto } from './dto/sign-in.dto';
import { UserInfo } from '@users/dto/response-user.dto';
import { TokenInterceptor } from 'src/interseptors/token.interceptor';
import { JwtInterceptor } from 'src/interseptors/jwt.interceptor';

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
  // @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(TokenInterceptor, JwtInterceptor)
  async login(@Body() signInDto: SignInDto): Promise<UserInfo> {
    return this.authService.login(signInDto);
  }

  @Get('/me')
  @UseGuards(SessionAuthGuard, JWTAuthGuard)
  me(@AuthUser() user: User): User {
    return user;
  }
}
