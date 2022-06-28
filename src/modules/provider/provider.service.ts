import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserProvider } from 'src/shared/entities';
import { UserProviderEnum } from 'src/common/enums/user';
import { CreateProviderDto } from './dto/createProvider.dto';

@Injectable()
export class ProviderService {
  constructor(
    @InjectRepository(UserProvider)
    private readonly providerRepository: Repository<UserProvider>,
  ) {}

  async create(userProviderData: CreateProviderDto) {
    const userProvider = new UserProvider(userProviderData);
    return await this.providerRepository.save(userProvider);
  }

  async getProviderByTypeAndOid(oid: string, providerType: UserProviderEnum): Promise<UserProvider | null> {
    return await this.providerRepository.findOne({
      where: { type: providerType, oid },
      relations: ['user', 'user.profile'],
    });
  }
}
