import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Repository } from 'typeorm';

import { Client } from '../../shared/entities/client.entity';

@ValidatorConstraint({ name: 'isClientAlreadyExist', async: true })
@Injectable()
export class IsClientAlreadyExist implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  async validate(id: string): Promise<boolean> {
    const client = await this.clientRepository.findOne({ where: { id } });

    return !client;
  }

  defaultMessage(): string {
    return 'Incorrect registration data.';
  }
}
