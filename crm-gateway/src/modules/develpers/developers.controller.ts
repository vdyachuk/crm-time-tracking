import { Body, Controller, Get, Post, UseGuards, HttpStatus } from '@nestjs/common';
import { CreateDeveloperDto } from './dto/create-developer.dto';
import { DevelopersService } from './developers.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Developer } from '../../interface/developers.model';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { AddRoleDto } from './dto/add-role.dto';

@ApiTags('Developers')
@Controller('developers')
export class DevelopersController {
    constructor(private developersService: DevelopersService) {}

    @ApiOperation({ summary: 'Create developer' })
    @ApiResponse({ status: HttpStatus.CREATED, type: Developer })
    @Post()
    create(@Body() developerDto: CreateDeveloperDto) {
        return this.developersService.createDeveloper(developerDto);
    }

    @ApiOperation({ summary: 'Get all developers' })
    @ApiResponse({ status: HttpStatus.OK, type: [Developer] })
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get()
    getAll() {
        return this.developersService.getAllDevelopers();
    }

    @ApiOperation({ summary: 'Giv a role' })
    @ApiResponse({ status: HttpStatus.OK })
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/role')
    addRole(@Body() dto: AddRoleDto) {
        return this.developersService.addRole(dto);
    }
}
