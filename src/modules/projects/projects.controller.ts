import { Controller, Body, HttpStatus, Post, Get, Put, Param, Delete, HttpCode } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CreateProjectDto, ProjectResponseDto, UpdateProjectDto } from './dto';
import { ProjectsService } from './projects.service';

@Controller('projects')
@ApiTags('Projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: ProjectResponseDto, isArray: true })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  public async getAll(): Promise<ProjectResponseDto[]> {
    const projects = await this.projectsService.getAll();

    return ProjectResponseDto.mapFromMulti(projects);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: ProjectResponseDto })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  public async findById(@Param('id') projectId: string): Promise<ProjectResponseDto> {
    const project = await this.projectsService.findById(projectId);

    return ProjectResponseDto.mapFrom(project);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({ type: ProjectResponseDto, description: 'Successfully created project' })
  @ApiBadRequestResponse({ description: 'Incorrect data.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async create(@Body() data: CreateProjectDto): Promise<ProjectResponseDto> {
    const project = await this.projectsService.create(data);
    return ProjectResponseDto.mapFrom(project);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Successfully updated project' })
  @ApiBadRequestResponse({ description: 'Incorrect data.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async update(@Param('id') projectId: string, @Body() projectData: UpdateProjectDto) {
    const project = await this.projectsService.update(projectId, projectData);
    return ProjectResponseDto.mapFrom(project);
  }

  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK, isArray: true, type: ProjectResponseDto })
  async delete(@Param() params) {
    return await this.projectsService.delete(params.id);
  }
}
