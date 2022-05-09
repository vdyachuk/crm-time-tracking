import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { HttpModule } from '@nestjs/axios';
import { ProjectsService } from './projects.service';
import { AccountModule } from 'src/account/account.module';

@Module({
    imports: [HttpModule, AccountModule],
    controllers: [ProjectsController],
    providers: [ProjectsService]
})
export class ProjectsModule {}
