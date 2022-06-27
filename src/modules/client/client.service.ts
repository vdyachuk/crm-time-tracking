import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Client } from '../../shared/entities/client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  async createClient(dto: CreateClientDto) {
    const client = await this.clientRepository.create(dto);
    return client;
  }
}
