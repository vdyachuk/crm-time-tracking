import { IsInt, IsString, IsArray } from 'class-validator';

export class UpdateMovieDto {
    @IsString()
    name?: string;

    @IsInt()
    rating?: number;

    @IsArray()
    time?: string[];
}
