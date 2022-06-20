import { Controller, Body, HttpStatus, Post, Get, Put, Param, Delete } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ProjectData, ProjectInput } from './model';
import { ProjectPipe } from './flow';
import { UpdateProjectDto } from './dto';

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

  @Put(':id')
  @ApiResponse({ status: HttpStatus.OK, isArray: true, type: ProjectData })
  async update(@Param('id') projectId: string, @Body('project') projectData: UpdateProjectDto) {
    return await this.projectsService.update(projectId, projectData);
  }

  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK, isArray: true, type: ProjectData })
  async delete(@Param() params) {
    return await this.projectsService.delete(params.id);
  }
}
