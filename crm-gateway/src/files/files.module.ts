import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { configuration } from '../config/configuration';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';

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
    controllers: [FilesController],
    providers: [FilesService]
})
export class FilesModule {}
