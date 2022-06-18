import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';

import { User, Project, RoleNotificationType } from '.';

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
  })
  message: string;

  @Column()
  isDelivered: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => RoleNotificationType, (roleNotificationType) => roleNotificationType.notifications)
  roleNotificationType: RoleNotificationType;

  @ManyToOne(() => Project, (project) => project.notifications)
  project: Project;

  @ManyToOne(() => User, (user) => user.notifications)
  user: User;
}
