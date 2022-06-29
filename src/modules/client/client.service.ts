import { Injectable, NotFoundException, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { ClientCreateDto, ClientUpdateDto } from './dto';
import { Client } from '@entities/index';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientsRepository: Repository<Client>,
  ) {}

  async create(data: ClientCreateDto): Promise<Client> {
    return await this.clientsRepository.save(data);
  }
  async getAll(): Promise<Client[]> {
    return this.clientsRepository.find();
  }
  async update(id: string, dto: ClientUpdateDto): Promise<Client> {
    const client = await this.clientsRepository.findOne({ where: { id: dto.clientId } });

    if (!client) {
      throw new NotFoundException(`There isn't any client with id: ${id}`);
    }
    if (!client) {
      throw new NotFoundException(`There isn't any client with id: ${dto.clientId}`);
    }
    client.name = dto.name;
    try {
      return await this.clientsRepository.save({
        ...client,
        name: dto.name,
      });
    } catch (e) {
      Logger.error('Client:update:', e);
      throw new InternalServerErrorException('Internal server error');
    }
  }
  async findById(id: string): Promise<Client> {
    return await this.clientsRepository.findOne({ where: { id } });
  }
  async delete(id: string): Promise<DeleteResult> {
    try {
      const client = await this.clientsRepository.findOne({ where: { id } });

      if (!client) {
        throw new NotFoundException(`There isn't any client with id: ${id}`);
      }

      return await this.clientsRepository.delete({ id });
    } catch (e) {
      Logger.error('Client:delete:', e);
      throw new InternalServerErrorException('Internal server error');
    }
  }
}
