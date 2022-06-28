import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Client } from '../../shared/entities/client.entity';
import { ClientController } from './client.controller';
import { ClientsService } from './client.service';
import { IsClientAlreadyExist } from './is-client-already-exist.validator';

@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  controllers: [ClientController],
  providers: [ClientsService, IsClientAlreadyExist],
  exports: [ClientsService],
})
export class ClientModule {}
