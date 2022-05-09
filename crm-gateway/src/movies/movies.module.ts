import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { HttpModule } from '@nestjs/axios';
import { MoviesService } from './movies.service';
import { AccountModule } from 'src/account/account.module';

@Module({
    imports: [HttpModule, AccountModule],
    controllers: [MoviesController],
    providers: [MoviesService]
})
export class MoviesModule {}
