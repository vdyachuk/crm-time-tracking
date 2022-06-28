import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, In } from 'typeorm';

import { ProjectRO } from '@interface/projects.model';
import { UpdateProjectDto, CreateProjectDto } from './dto';
import { Project, Client, User } from '@entities/index';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,

    @InjectRepository(Client)
    private clientRepository: Repository<Client>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getAll(): Promise<Project[]> {
    return this.projectsRepository.find();
  }

  async create(data: CreateProjectDto): Promise<Project> {
    const client = await this.clientRepository.findOne({ where: { id: data.clientId } });

    if (!client) {
      throw new NotFoundException(`There isn't any client with id: ${data.clientId}`);
    }

    let users: User[] = [];

    if (data.performerIds.length) {
      users = await this.userRepository.findBy({ id: In(data.performerIds) });
    }

    const project = new Project({
      ...data,
      client,
      users,
    });

    try {
      return await this.projectsRepository.save(project);
    } catch (_) {
      throw new InternalServerErrorException('Internal server error');
    }
  }

  async findById(id: string): Promise<ProjectRO> {
    const project = await this.projectsRepository.findOne({ where: { id } });

    return this.buildProjectRO(project);
  }

  async update(id: string, dto: UpdateProjectDto): Promise<Project> {
    const project = await this.projectsRepository.findOne({ where: { id } });

    if (!project) {
      throw new NotFoundException(`There isn't any project with id: ${id}`);
    }

    const client = await this.clientRepository.findOne({ where: { id: dto.clientId } });

    if (!client) {
      throw new NotFoundException(`There isn't any client with id: ${dto.clientId}`);
    }

    let users: User[] = [];

    if (dto.performerIds.length) {
      users = await this.userRepository.findBy({ id: In(dto.performerIds) });
    }

    project.name = dto.name;

    try {
      return await this.projectsRepository.save({
        ...project,
        client,
        users,
      });
    } catch (_) {
      throw new InternalServerErrorException('Internal server error');
    }
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
