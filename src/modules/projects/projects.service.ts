import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, In } from 'typeorm';

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
    return this.projectsRepository.find({
      relations: ['client', 'users'],
    });
  }

  async create(data: CreateProjectDto): Promise<Project> {
    try {
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

      return await this.projectsRepository.save(project);
    } catch (e) {
      Logger.error('Project:create:', e);
      throw new InternalServerErrorException('Internal server error');
    }
  }

  async findById(id: string): Promise<Project> {
    return await this.projectsRepository.findOne({
      where: { id },
      relations: ['client', 'users'],
    });
  }

  async update(id: string, dto: UpdateProjectDto): Promise<Project> {
    try {
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

      return await this.projectsRepository.save({
        ...project,
        name: dto.name,
        client,
        users,
      });
    } catch (e) {
      Logger.error('Project:update:', e);
      throw new InternalServerErrorException('Internal server error');
    }
  }

  async delete(id: string): Promise<DeleteResult> {
    try {
      const project = await this.projectsRepository.findOne({ where: { id } });

      if (!project) {
        throw new NotFoundException(`There isn't any project with id: ${id}`);
      }

      return await this.projectsRepository.delete({ id });
    } catch (e) {
      Logger.error('Project:delete:', e);
      throw new InternalServerErrorException('Internal server error');
    }
  }
}
