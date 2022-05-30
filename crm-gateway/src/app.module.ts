import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { SequelizeModule } from '@nestjs/sequelize';
import { Developer } from './modules/developers/developers.model';
import { Role } from './modules/roles/roles.model';
import { DeveloperRoles } from './modules/roles/developer-roles.model';
import * as path from 'path';

import { DevelopersModule } from './modules/developers/developers.module';
import { FilesModule } from './modules/files/files.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { AuthModule } from './modules/auth/auth.module';
import { RolesModule } from './modules/roles/roles.module';

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static')
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRESS_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRESS_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [Developer, Role, DeveloperRoles],
            autoLoadModels: true
        }),
        DevelopersModule,
        FilesModule,
        ProjectsModule,
        AuthModule,
        RolesModule
    ]
})
export class AppModule {}
