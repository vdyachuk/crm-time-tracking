import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { AuthGuard } from 'src/guards/auth.guard';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {}

    @Get()
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    async getAll(): Promise<any> {
        const movies = await this.moviesService.getAll();

        return movies;
    }

    @Get(':id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    async getOne(@Param('id') id: string): Promise<any> {
        const movie = await this.moviesService.getById(id);

        return movie;
    }

    @Post()
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    async create(@Body() createMovieDto: CreateMovieDto): Promise<any> {
        const movie = await this.moviesService.create(createMovieDto);

        return movie;
    }

    @Put(':id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    async update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto): Promise<any> {
        const movie = await this.moviesService.update(id, updateMovieDto);

        return movie;
    }

    @Delete(':id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    async remove(@Param('id') id: string): Promise<void> {
        await this.moviesService.delete(id);
    }
}
