import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class FilesService {
    constructor(@Inject('FILE_MICROSERVICE') private readonly client: ClientProxy) {}

    async filesUpload(files: Express.Multer.File[]) {
        return this.client.send({ role: 'file', cmd: 'upload-files' }, files[0]);
    }
}
