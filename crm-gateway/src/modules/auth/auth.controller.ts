import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateDeveloperDto } from '../developers/dto/create-developer.dto';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/login')
    login(@Body() developerDto: CreateDeveloperDto) {
        return this.authService.login(developerDto);
    }
}
