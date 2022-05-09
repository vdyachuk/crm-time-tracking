import { IsInt, IsString, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieDto {
    @ApiProperty({ example: 'Matrix II' })
    @IsString()
    name: string;

    @ApiProperty({ example: 8 })
    @IsInt()
    rating: number;

    @ApiProperty({ example: ['10:00', '12:00'] })
    @IsArray()
    time: string[];
}
