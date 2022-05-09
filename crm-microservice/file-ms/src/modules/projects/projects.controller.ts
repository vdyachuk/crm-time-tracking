import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { Project } from '../../entities/project.entity';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) {}

    @Get()
    @MessagePattern({ role: 'project', cmd: 'get-all' })
    async getAll(): Promise<Project[]> {
        return await this.projectsService.getAll();
    }
}
