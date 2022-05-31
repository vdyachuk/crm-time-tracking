import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { configuration } from '../../config/configuration-file';
import { DevelopersController } from './developers.controller';
import { DevelopersService } from './developers.service';

import { SequelizeModule } from '@nestjs/sequelize';
import { Developer } from '../../interface/developers.model';
import { Role } from '../../interface/roles.model';
import { DeveloperRoles } from '../../entities/role.entity';
import { RolesModule } from '../roles/roles.module';
import { AuthModule } from '../auth/auth.module';
import { forwardRef } from '@nestjs/common';

@Module({
    imports: [
        SequelizeModule.forFeature([Developer, Role, DeveloperRoles]),
        RolesModule,
        forwardRef(() => AuthModule),
        ClientsModule.register([
            {
                name: 'FILE_MICROSERVICE',
                transport: Transport.TCP,
                options: {
                    host: configuration.services.fileMs.host,
                    port: configuration.services.fileMs.port
                }
            }
        ])
    ],
    controllers: [DevelopersController],
    providers: [DevelopersService]
})
export class DevelopersModule {}
