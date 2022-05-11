import { Controller, Get } from '@nestjs/common';

import { DevelopersService } from './developers.service';

@Controller('developers')
export class DevelopersController {
    constructor(private readonly developersService: DevelopersService) {}

    @Get()
    getAll() {
        return this.developersService.getAll();
    }
}
