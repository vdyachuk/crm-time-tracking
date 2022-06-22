import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { RoleNotificationType } from './index';

@Entity('notificationTypes')
export class NotificationType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 255,
  })
  name: string;

  @OneToMany(() => RoleNotificationType, (roleNotificationType) => roleNotificationType.notificationType)
  roleNotificationTypes: RoleNotificationType[];
}
