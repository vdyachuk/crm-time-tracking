import { Controller, Body, HttpStatus, Post, Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ProjectData, ProjectInput } from '../projects/model';
import { ProjectPipe } from '../projects/flow/';

import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) {}

    @Get()
    @ApiResponse({ status: HttpStatus.OK, isArray: true, type: ProjectData })
    public async getAll(): Promise<ProjectData[]> {
        const project = await this.projectsService.getAll();

        return project.map((project) => project.buildData());
    }

    @Post()
    @ApiResponse({ status: HttpStatus.CREATED, type: ProjectData })
    async create(@Body(ProjectPipe) input: ProjectInput): Promise<ProjectData> {
        const project = await this.projectsService.create(input);
        return project.buildData();
    }
}
