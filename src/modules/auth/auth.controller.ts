import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, UseInterceptors } from '@nestjs/common';

import { AuthUser } from '@users/users.decorator';
import { User } from '@entities/user.entity';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { JWTAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { SessionAuthGuard } from './guards/session-auth.guard';
import { TokenInterceptor } from '@interseptors/token.interceptor';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  // @UseInterceptors(TokenInterceptor)
  register(@Body() signUpDto: SignUpDto): Promise<User> {
    return this.authService.register(signUpDto);
  }

  @Post('login')
  // @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  // @UseInterceptors(TokenInterceptor)
  async login(@Body() signInDto: SignInDto): Promise<User> {
    return this.authService.login(signInDto);
  }

  @Get('/me')
  @UseGuards(SessionAuthGuard, JWTAuthGuard)
  me(@AuthUser() user: User): User {
    return user;
  }
}
