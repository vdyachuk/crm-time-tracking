import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { User, Client, Rate, LoggedDay, Department, Notification } from './index';

import { ProjectData } from '@projects/model';

import { ProjectTypeEnum, ProjectStatusEnum } from '../../common/enums/project';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 255,
  })
  name: string;

  @Column({
    type: 'enum',
    enum: ProjectTypeEnum,
    default: ProjectTypeEnum.UNDEFINED,
  })
  type: ProjectTypeEnum;

  @Column({
    type: 'enum',
    enum: ProjectStatusEnum,
    default: ProjectStatusEnum.PAUSED,
  })
  status: ProjectStatusEnum;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Department)
  @JoinColumn()
  department: Department;

  @OneToOne(() => Client)
  @JoinColumn()
  client: Client;

  @OneToMany(() => Notification, (notification) => notification.project)
  notifications: Notification[];

  @OneToMany(() => LoggedDay, (loggedDay) => loggedDay.project)
  loggedDays: LoggedDay[];

  @OneToMany(() => Rate, (rate) => rate.project)
  rates: Rate[];

  @ManyToMany(() => User)
  @JoinTable()
  users: User[];

  public buildData(): ProjectData {
    return {
      id: this.id,
      name: this.name,
    };
  }
}
