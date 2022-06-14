import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ProjectData } from '../modules/projects/model';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  public buildData(): ProjectData {
    return {
      id: this.id,
      name: this.name,
    };
  }
}
