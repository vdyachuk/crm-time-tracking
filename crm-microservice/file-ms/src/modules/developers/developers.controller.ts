import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { Developer } from '../../entities/developer.entity';
import { DevelopersService } from './developers.service';

@Controller('developers')
export class DevelopersController {
    constructor(private readonly developersService: DevelopersService) {}

    @Get()
    @MessagePattern({ role: 'developer', cmd: 'get-all' })
    async getAll(): Promise<Developer[]> {
        return await this.developersService.getAll();
    }
}
