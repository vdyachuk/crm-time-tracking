import { ApiProperty } from '@nestjs/swagger';

export class LoggedDayInput {
    @ApiProperty()
    public readonly dayData: string;
    @ApiProperty()
    public readonly time: string;
    @ApiProperty()
    public readonly desctiption: string;
    @ApiProperty()
    public readonly hours: string;
    @ApiProperty()
    public readonly day: string;
    @ApiProperty()
    public readonly month: string;
    @ApiProperty()
    public readonly year: string;
}
