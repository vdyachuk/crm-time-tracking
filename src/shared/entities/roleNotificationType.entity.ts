import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

import { NotificationType, Notification, Role } from './index';

@Entity('roleNotificationTypes')
export class RoleNotificationType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 255,
  })
  name: string;

  @Column({
    type: 'text',
  })
  template: string;

  @ManyToOne(() => NotificationType, (notificationType) => notificationType.roleNotificationTypes)
  notificationType: NotificationType;

  @ManyToOne(() => Role, (role) => role.roleNotificationTypes)
  role: Role;

  @OneToMany(() => Notification, (notification) => notification.roleNotificationType)
  notifications: Notification[];
}
