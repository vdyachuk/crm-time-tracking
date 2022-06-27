import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { Project, Client, User } from '@entities/index';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Client, User])],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
