import { Column, Entity } from 'typeorm';
import { ProjectData } from '.';

@Entity({ name: 'projects' })
export class Project {
    public static readonly NAME_LENGTH = 50;

    @Column({ name: 'name', length: Project.NAME_LENGTH })
    public name: string;

    public buildData(): ProjectData {
        return {
            name: this.name
        };
    }
}
