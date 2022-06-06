import { Module } from '@nestjs/common';
import { configuration } from './config/configuration';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health/health.controller';

import { UserModule } from './modules/users/users.module';
import { FilesModule } from './modules/files/files.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection, ConnectionOptions } from 'typeorm';

@Module({
    imports: [
        TypeOrmModule.forRoot(configuration.database as ConnectionOptions),
        UserModule,
        TerminusModule,
        FilesModule,
        ProjectsModule,
        AuthModule
    ],
    controllers: [HealthController],
    providers: []
})
export class AppModule {
    constructor(private connection: Connection) {}
}
