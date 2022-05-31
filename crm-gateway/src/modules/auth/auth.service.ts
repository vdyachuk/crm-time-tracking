import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateDeveloperDto } from '../develpers/dto/create-developer.dto';
import { DevelopersService } from '../develpers/developers.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Developer } from '../../interface/developers.model';

@Injectable()
export class AuthService {
    constructor(private developerService: DevelopersService, private jwtService: JwtService) {}

    async login(developerDto: CreateDeveloperDto) {
        const developer = await this.validateDeveloper(developerDto);
        return this.generateToken(developer);
    }

    private async generateToken(developer: Developer) {
        const payload = { email: developer.email, id: developer.id, roles: developer.roles };
        return {
            token: this.jwtService.sign(payload)
        };
    }

    private async validateDeveloper(developerDto: CreateDeveloperDto) {
        const developer = await this.developerService.getDeveloperByEmail(developerDto.email);
        const passwordEquals = await bcrypt.compare(developerDto.password, developer.password);
        if (developer && passwordEquals) {
            return developer;
        }
        throw new UnauthorizedException({ message: 'Incorect email or password' });
    }
}
