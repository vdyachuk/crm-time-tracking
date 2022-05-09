import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
    constructor(private httpService: HttpService) {}

    getAll() {
        const axiosResponse = this.httpService.get(process.env.SERVER_URL + '/movies');
        const movies = lastValueFrom(axiosResponse.pipe(map((response) => response.data.data)));

        return movies;
    }

    getById(movieId: string) {
        const axiosResponse = this.httpService.get(process.env.SERVER_URL + `/movies/${movieId}`);
        const movie = lastValueFrom(axiosResponse.pipe(map((response) => response.data.data)));

        return movie;
    }

    create(movie: CreateMovieDto) {
        const axiosResponse = this.httpService.post(process.env.SERVER_URL + '/movies', movie);
        const newMovie = lastValueFrom(axiosResponse.pipe(map((response) => response.data.movie)));

        return newMovie;
    }

    update(movieId: string, movie: UpdateMovieDto) {
        const axiosResponse = this.httpService.put(process.env.SERVER_URL + `/movies/${movieId}`, movie);
        const newMovie = lastValueFrom(axiosResponse.pipe(map((response) => response.data.movie)));

        return newMovie;
    }

    delete(movieId: string) {
        const axiosResponse = this.httpService.delete(process.env.SERVER_URL + `/movies/${movieId}`);
        const responseData = lastValueFrom(axiosResponse.pipe(map((response) => response.data.id)));

        return responseData;
    }
}
