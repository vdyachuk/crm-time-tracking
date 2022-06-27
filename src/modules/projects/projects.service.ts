import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { ProjectInput } from './model';
import { ProjectRO } from '@interface/projects.model';
import { UpdateProjectDto } from './dto';
import { Project } from '@entities/project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  async getAll(): Promise<Project[]> {
    return this.projectsRepository.find();
  }

  async create(input: ProjectInput): Promise<Project> {
    const project = new Project();
    project.name = input.name;
    return this.projectsRepository.save(project);
  }

  async findById(id: string): Promise<ProjectRO> {
    const project = await this.projectsRepository.findOne({ where: { id } });

    return this.buildProjectRO(project);
  }

  async update(id: string, dto: UpdateProjectDto): Promise<Project> {
    const toUpdate = await this.projectsRepository.findOne({ where: { id } });

    const updated = Object.assign(toUpdate, dto);
    return await this.projectsRepository.save(updated);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.projectsRepository.delete({ id: id });
  }

  private buildProjectRO(project: Project) {
    const projectRO = {
      id: project.id,
      name: project.name,
    };

    return { project: projectRO };
  }
}
