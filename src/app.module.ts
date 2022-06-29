import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './modules/health/health.controller';

import { UserModule } from '@users/users.module';
import { ProjectsModule } from '@projects/projects.module';
import { AuthModule } from '@auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { postgresConfig } from '@config/postgres.config';
import { ClientModule } from './modules/client/client.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(postgresConfig),
    UserModule,
    TerminusModule,
    ProjectsModule,
    AuthModule,
    ClientModule,
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
