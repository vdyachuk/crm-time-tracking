import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Client } from '../../shared/entities/client.entity';
import { ClientService } from './client.service';
import { IsClientAlreadyExist } from './is-client-already-exist.validator';

@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  controllers: [],
  providers: [ClientService, IsClientAlreadyExist],
  exports: [ClientService],
})
export class ClientModule {}
