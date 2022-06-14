import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { LoggedDayData } from './index';

@Entity({ name: 'loggedday' })
export class LoggedDay {
    public static readonly NAME_LENGTH = 50;
    @Column({ length: LoggedDay.NAME_LENGTH })
    public dayData: string;

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public projectId: number;

    @Column()
    public time: Date;

    @Column({ length: LoggedDay.NAME_LENGTH })
    public desctiption: string;

    @Column()
    public hours: number;

    @Column()
    public day: number;

    @Column({ length: LoggedDay.NAME_LENGTH })
    public month: string;

    @Column()
    public year: number;

    public buildData(): LoggedDayData {
        return {
            dayData: this.dayData,
            id: this.id,
            projectID: this.projectId,
            time: this.time,
            desctiption: this.desctiption,
            hours: this.hours,
            day: this.day,
            month: this.month,
            year: this.year,
        };
    }
}
