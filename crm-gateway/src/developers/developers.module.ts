import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { configuration } from '../config/configuration';
import { DevelopersController } from './developers.controller';
import { DevelopersService } from './developers.service';

@Module({
    imports: [
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
