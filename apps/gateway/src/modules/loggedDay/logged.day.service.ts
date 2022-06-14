import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { LoggedDayInput } from './model';
import { LoggedDayRO } from '../../interface/logged.day.model';
import { UpdateLoggedDayDto } from './dto';
import { LoggedDay } from '../../entities/logged.day.entity';

@Injectable()
export class LoggedDaysService {
  constructor(
    @InjectRepository(LoggedDay)
    private loggedDaysRepository: Repository<LoggedDay>,
  ) {}

  async getAll(): Promise<LoggedDay[]> {
    return this.loggedDaysRepository.find();
  }

  async findById(id: number): Promise<LoggedDayRO> {
    const loggedDay = await this.loggedDaysRepository.findOne({ where: { id } });

    return this.buildLoggedDayRO(loggedDay);
  }
  async create(input: LoggedDayInput): Promise<LoggedDay> {
    const loggedDay = new LoggedDay();
    loggedDay.dayData = input.dayData;
    return this.loggedDaysRepository.save(loggedDay);
  }
  async update(id: number, dto: UpdateLoggedDayDto): Promise<LoggedDay> {
    const toUpdate = await this.loggedDaysRepository.findOne({ where: { id } });

    const updated = Object.assign(toUpdate, dto);
    return await this.loggedDaysRepository.save(updated);
  }
  async delete(id: number): Promise<DeleteResult> {
    return await this.loggedDaysRepository.delete({ id });
  }
  private buildLoggedDayRO(loggedDay: LoggedDay) {
    const loggedDayRO = {
      id: loggedDay.id,
      dayData: loggedDay.dayData,
    };

    return { loggedDay: loggedDayRO };
  }
}
