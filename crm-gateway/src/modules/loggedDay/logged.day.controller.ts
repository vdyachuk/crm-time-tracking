import { Controller, Body, HttpStatus, Post, Get, Put, Param, Delete } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { LoggedDayData, LoggedDayInput } from '../loggedDay/model';
import { LoggedDayPipe } from '../loggedDay/flow/logged.day.pipe';
import { UpdateLoggedDayDto } from '../loggedDay/dto/logged.day.update';

import { LoggedDaysService } from './logged.day.service';

@Controller('loggedDay')
export class LoggedDaysController {
    constructor(private readonly loggedDaysService: LoggedDaysService) {}

    @Get()
    @ApiResponse({ status: HttpStatus.OK, isArray: true, type: LoggedDayData })
    public async getAll(): Promise<LoggedDayData[]> {
        const loggedDay = await this.loggedDaysService.getAll();

        return loggedDay.map((loggedDay) => loggedDay.buildData());
    }

    @Post()
    @ApiResponse({ status: HttpStatus.CREATED, type: LoggedDayData })
    async create(@Body(LoggedDayPipe) input: LoggedDayInput): Promise<LoggedDayData> {
        const loggedDay = await this.loggedDaysService.create(input);
        return loggedDay.buildData();
    }

    @Put(':id')
    @ApiResponse({ status: HttpStatus.OK, isArray: true, type: LoggedDayData })
    async update(@Param('id') loggedDayId: number, @Body('loggedDay') loggedDayData: UpdateLoggedDayDto) {
        return await this.loggedDaysService.update(loggedDayId, loggedDayData);
    }
    @Delete(':id')
    @ApiResponse({ status: HttpStatus.OK, isArray: true, type: LoggedDayData })
    async delete(@Param() params) {
        return await this.loggedDaysService.delete(params.id);
    }
}
