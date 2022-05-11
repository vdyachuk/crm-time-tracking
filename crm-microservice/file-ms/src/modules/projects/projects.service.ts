import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectInput } from '../projects/model';

import { Project } from '../../entities/project.entity';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(Project)
        private projectsRepository: Repository<Project>
    ) {}

    async getAll(): Promise<Project[]> {
        return this.projectsRepository.find();
    }

    async create(input: ProjectInput): Promise<Project> {
        const project = new Project();
        project.name = input.name;
        return this.projectsRepository.save(project);
    }
}
