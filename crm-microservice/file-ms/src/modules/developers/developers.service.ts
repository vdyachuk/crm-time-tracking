import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Developer } from '../../entities/developer.entity';

@Injectable()
export class DevelopersService {
    constructor(
        @InjectRepository(Developer)
        private developersRepository: Repository<Developer>
    ) {}

    getAll(): Promise<Developer[]> {
        return this.developersRepository.find();
    }
}
