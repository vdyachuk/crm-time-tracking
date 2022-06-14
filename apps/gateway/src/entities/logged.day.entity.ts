import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { LoggedDayData } from '../modules/loggedDay/model';

@Entity()
export class LoggedDay {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    dayData: string;

    @Column()
    projectId: number;

    @Column()
    time: Date;

    @Column()
    desctiption: string;

    @Column()
    hours: number;

    @Column()
    day: number;

    @Column()
    month: string;

    @Column()
    year: number;

    public buildData(): LoggedDayData {
        return {
            id: this.id,
            dayData: this.dayData,
            projectID: this.projectId,
            time: this.time,
            desctiption: this.desctiption,
            hours: this.hours,
            day: this.day,
            month: this.month,
            year: this.year
        };
    }
}
