import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LoggedDaysService } from './logged.day.service';
import { LoggedDaysController } from './logged.day.controller';
import { LoggedDay } from '../../entities/logged.day.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LoggedDay])],
  controllers: [LoggedDaysController],
  providers: [LoggedDaysService],
})
export class LoggedDaysModule {}
