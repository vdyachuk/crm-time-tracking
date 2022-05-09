import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { AuthGuard } from 'src/guards/auth.guard';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) {}

    @Get()
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    async getAll(): Promise<any> {
        const projects = await this.projectsService.getAll();

        return projects;
    }

    @Get(':id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    async getOne(@Param('id') id: string): Promise<any> {
        const project = await this.projectsService.getById(id);

        return project;
    }

    @Post()
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    async create(@Body() createProjectDto: CreateProjectDto): Promise<any> {
        const project = await this.projectsService.create(createProjectDto);

        return project;
    }

    @Put(':id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    async update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto): Promise<any> {
        const project = await this.projectsService.update(id, updateProjectDto);

        return project;
    }

    @Delete(':id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    async remove(@Param('id') id: string): Promise<void> {
        await this.projectsService.delete(id);
    }
}
