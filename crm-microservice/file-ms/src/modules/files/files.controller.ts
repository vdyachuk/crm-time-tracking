import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { FilesService } from './files.service';

@Controller()
export class FilesController {
    constructor(private readonly filesService: FilesService) {}

    @MessagePattern({ role: 'file', cmd: 'upload-files' })
    fileParser(file: Express.Multer.File) {
        const excelJson = this.filesService.fileParser(file);

        return excelJson;
    }
}
