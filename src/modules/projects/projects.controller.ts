import { Controller, Body, HttpStatus, Post, Get, Put, Param, Delete, HttpCode, ParseUUIDPipe } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { CreateProjectDto, ProjectResponseDto, UpdateProjectDto } from './dto';
import { ProjectsService } from './projects.service';

@Controller('projects')
@ApiTags('Projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: ProjectResponseDto, isArray: true })
  public async getAll(): Promise<ProjectResponseDto[]> {
    const projects = await this.projectsService.getAll();

    return ProjectResponseDto.mapFromMulti(projects);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiNotFoundResponse({ description: `There isn't any project with id` })
  @ApiOkResponse({ type: ProjectResponseDto })
  public async findById(@Param('id', ParseUUIDPipe) projectId: string): Promise<ProjectResponseDto> {
    const project = await this.projectsService.findById(projectId);

    return ProjectResponseDto.mapFrom(project);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({ type: ProjectResponseDto })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async create(@Body() data: CreateProjectDto): Promise<ProjectResponseDto> {
    const project = await this.projectsService.create(data);
    return ProjectResponseDto.mapFrom(project);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: ProjectResponseDto })
  @ApiNotFoundResponse({ description: `There isn't any project with id` })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async update(@Param('id', ParseUUIDPipe) projectId: string, @Body() projectData: UpdateProjectDto) {
    const project = await this.projectsService.update(projectId, projectData);
    return ProjectResponseDto.mapFrom(project);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOkResponse({})
  @ApiNotFoundResponse({ description: `There isn't any project with id` })
  async delete(@Param('id', ParseUUIDPipe) projectId: string) {
    await this.projectsService.delete(projectId);
  }
}
