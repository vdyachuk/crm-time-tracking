import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ProjectData } from './index';

@Entity({ name: 'projects' })
export class Project {
    public static readonly NAME_LENGTH = 50;
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ name: 'name', length: Project.NAME_LENGTH })
    public name: string;

    public buildData(): ProjectData {
        return {
            id: this.id,
            name: this.name,
        };
    }
}
