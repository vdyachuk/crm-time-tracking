import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './roles.model';
import { Developer } from '../developers/developers.model';
import { DeveloperRoles } from './developer-roles.model';

@Module({
    providers: [RolesService],
    controllers: [RolesController],
    imports: [SequelizeModule.forFeature([Role, Developer, DeveloperRoles])],
    exports: [RolesService]
})
export class RolesModule {}
