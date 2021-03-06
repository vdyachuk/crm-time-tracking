import { Controller, Body, HttpStatus, Post, Get, Put, Param, Delete } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { LoggedDayData, LoggedDayInput } from './model';
import { LoggedDayPipe } from './flow/logged.day.pipe';
import { UpdateLoggedDayDto } from './dto/logged.day.update';

import { LoggedDaysService } from './logged.day.service';

@Controller('loggedDay')
export class LoggedDaysController {
  constructor(private readonly loggedDaysService: LoggedDaysService) {}

  @Get()
  @ApiResponse({ status: HttpStatus.OK, isArray: true, type: LoggedDayData })
  public async getAll(): Promise<null> {
    const loggedDay = await this.loggedDaysService.getAll();

    return null;
    // loggedDay.map((loggedDay) => loggedDay.buildData());
  }

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, type: LoggedDayData })
  async create(@Body(LoggedDayPipe) input: LoggedDayInput): Promise<null> {
    const loggedDay = await this.loggedDaysService.create(input);
    return null;
  }

  @Put(':id')
  @ApiResponse({ status: HttpStatus.OK, isArray: true, type: LoggedDayData })
  async update(@Param('id') loggedDayId: string, @Body('loggedDay') loggedDayData: UpdateLoggedDayDto) {
    return await this.loggedDaysService.update(loggedDayId, loggedDayData);
  }

  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK, isArray: true, type: LoggedDayData })
  async delete(@Param() params) {
    return await this.loggedDaysService.delete(params.id);
  }
}
