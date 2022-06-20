import { ApiProperty } from '@nestjs/swagger';

export class LoggedDayData {
  @ApiProperty({ description: 'DayData', example: '***' })
  public readonly dayData: string;
  @ApiProperty({ description: ' unique ID', example: '36635263' })
  public readonly id: string;
  @ApiProperty({ description: 'unique ID', example: '5332' })
  public readonly projectID: string;
  @ApiProperty({ description: 'Time', example: '12:00' })
  public readonly time: Date;
  @ApiProperty({ description: 'Description', example: 'Some description' })
  public readonly description: string;
  @ApiProperty({ description: 'Hours', example: '3' })
  public readonly hours: number;
  @ApiProperty({ description: 'Day', example: 'Monday' })
  public readonly day: number;
  @ApiProperty({ description: 'Day', example: 'July' })
  public readonly month: string;
  @ApiProperty({ description: 'Year', example: '20.05.2022' })
  public readonly year: number;
}
