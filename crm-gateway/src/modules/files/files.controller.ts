import { Controller, InternalServerErrorException, Post, Req, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { memoryStorage } from 'multer';

import { FilesService } from './files.service';
import { FastifyFilesInterceptor, xlsFileFilter } from '../../interseptors/fastifyFile.interseptor';

@Controller('files')
@ApiTags('Files')
export class FilesController {
    constructor(private readonly filesService: FilesService) {}

    @ApiConsumes('multipart/form-data')
    @Post('upload-files')
    @UseInterceptors(
        FastifyFilesInterceptor('file', 10, {
            storage: memoryStorage(),
            fileFilter: xlsFileFilter
        })
    )
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'array',
                    items: {
                        type: 'string',
                        format: 'binary'
                    }
                }
            }
        }
    })
    async multipartFileUpload(@Req() req: Request, @UploadedFiles() files: Express.Multer.File[]) {
        try {
            const resData = await this.filesService.filesUpload(files);
            return resData;
        } catch (e) {
            console.error('multipleFileUpload err ---', e);
            return new InternalServerErrorException('Error in sending data', e);
        }
    }
}
