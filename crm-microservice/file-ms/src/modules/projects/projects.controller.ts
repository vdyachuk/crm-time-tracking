import { Controller, Body, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ProjectData, ProjectInput } from '../projects/model';
import { ProjectPipe } from '../projects/flow/';

import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) {}

    @Post()
    @ApiResponse({ status: HttpStatus.CREATED, type: ProjectData })
    async create(@Body(ProjectPipe) input: ProjectInput): Promise<ProjectData> {
        const project = await this.projectsService.create(input);
        return project.buildData();
    }
}
