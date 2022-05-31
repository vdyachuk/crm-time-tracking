import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Developer } from '../../interface/developers.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateDeveloperDto } from './dto/create-developer.dto';
import { RolesService } from '../roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';

@Injectable()
export class DevelopersService {
    constructor(
        @InjectModel(Developer) private developerRepository: typeof Developer,
        private roleService: RolesService
    ) {}

    async createDeveloper(dto: CreateDeveloperDto) {
        const developer = await this.developerRepository.create(dto);
        const role = await this.roleService.getRoleByValue('ADMIN');
        await developer.$set('roles', [role.id]);
        developer.roles = [role];
        return developer;
    }

    async getAllDevelopers() {
        const developers = await this.developerRepository.findAll({ include: { all: true } });
        return developers;
    }

    async getDeveloperByEmail(email: string) {
        const developer = await this.developerRepository.findOne({ where: { email }, include: { all: true } });
        return developer;
    }

    async addRole(dto: AddRoleDto) {
        const developer = await this.developerRepository.findByPk(dto.developerId);
        const role = await this.roleService.getRoleByValue(dto.value);
        if (role && developer) {
            await developer.$add('role', role.id);
            return dto;
        }
        throw new HttpException('Developer not found', HttpStatus.NOT_FOUND);
    }
}
