import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
    constructor(private httpService: HttpService) {}

    getAll() {
        const axiosResponse = this.httpService.get(process.env.SERVER_URL + '/projects');
        const projects = lastValueFrom(axiosResponse.pipe(map((response) => response.data.data)));

        return projects;
    }

    getById(projectId: string) {
        const axiosResponse = this.httpService.get(process.env.SERVER_URL + `/projects/${projectId}`);
        const project = lastValueFrom(axiosResponse.pipe(map((response) => response.data.data)));

        return project;
    }

    create(project: CreateProjectDto) {
        const axiosResponse = this.httpService.post(process.env.SERVER_URL + '/projects', project);
        const newProject = lastValueFrom(axiosResponse.pipe(map((response) => response.data.project)));

        return newProject;
    }

    update(projectId: string, project: UpdateProjectDto) {
        const axiosResponse = this.httpService.put(process.env.SERVER_URL + `/projects/${projectId}`, project);
        const newProject = lastValueFrom(axiosResponse.pipe(map((response) => response.data.project)));

        return newProject;
    }

    delete(projectId: string) {
        const axiosResponse = this.httpService.delete(process.env.SERVER_URL + `/projects/${projectId}`);
        const responseData = lastValueFrom(axiosResponse.pipe(map((response) => response.data.id)));

        return responseData;
    }
}
