import { Module } from '@nestjs/common';
//import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
//import { configuration } from '../../config/configuration';

import { User } from '../../entities/user.entity';
import { ProfileController } from './profile/profile.controller';
import { UserService } from './users.service';
import { IsUserAlreadyExist } from './is-user-already-exist.validator';
import { Profile } from '../../entities/profile.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Profile])
        // ClientsModule.register([
        //     {
        //         name: 'FILE_MICROSERVICE',
        //         transport: Transport.TCP,
        //         options: {
        //             host: configuration.services.fileMs.host,
        //             port: configuration.services.fileMs.port
        //         }
        //     }
        // ])
    ],
    controllers: [ProfileController],
    providers: [UserService, IsUserAlreadyExist],
    exports: [UserService]
})
export class UserModule {}
