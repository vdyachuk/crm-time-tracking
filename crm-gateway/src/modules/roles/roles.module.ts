import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from '../../interface/roles.model';
import { Developer } from '../../interface/developers.model';
import { DeveloperRoles } from '../../entities/role.entity';

@Module({
    providers: [RolesService],
    controllers: [RolesController],
    imports: [SequelizeModule.forFeature([Role, Developer, DeveloperRoles])],
    exports: [RolesService]
})
export class RolesModule {}
