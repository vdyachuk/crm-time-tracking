import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { LoggedDayInput } from './model';
import { LoggedDayRO } from '@interface/logged.day.model';
import { UpdateLoggedDayDto } from './dto';
import { LoggedDay } from '@entities/loggedDay.entity';

@Injectable()
export class LoggedDaysService {
  constructor(
    @InjectRepository(LoggedDay)
    private loggedDaysRepository: Repository<LoggedDay>,
  ) {}

  async getAll(): Promise<LoggedDay[]> {
    return this.loggedDaysRepository.find();
  }

  async findById(id: string): Promise<LoggedDayRO> {
    const loggedDay = await this.loggedDaysRepository.findOne({ where: { id } });

    return this.buildLoggedDayRO(loggedDay);
  }

  async create(input: LoggedDayInput): Promise<LoggedDay> {
    const loggedDay = new LoggedDay();
    loggedDay.date = input.dayData;
    return this.loggedDaysRepository.save(loggedDay);
  }

  async update(id: string, dto: UpdateLoggedDayDto): Promise<LoggedDay> {
    const toUpdate = await this.loggedDaysRepository.findOne({ where: { id } });

    const updated = Object.assign(toUpdate, dto);
    return await this.loggedDaysRepository.save(updated);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.loggedDaysRepository.delete({ id });
  }

  private buildLoggedDayRO(loggedDay: any) {
    const loggedDayRO = {
      id: loggedDay.id,
      dayData: loggedDay.date,
    };

    return { loggedDay: loggedDayRO };
  }
}
