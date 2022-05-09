import { Module } from '@nestjs/common';

import { AccountModule } from './account/account.module';
import { DevelopersModule } from './developers/developers.module';
import { FilesModule } from './files/files.module';
import { MoviesModule } from './movies/movies.module';
import { ProjectsModule } from './projects/projects.module';

@Module({
    imports: [MoviesModule, AccountModule, FilesModule, DevelopersModule, ProjectsModule]
})
export class AppModule {}
