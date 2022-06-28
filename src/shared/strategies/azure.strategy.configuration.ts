import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { BearerStrategy } from 'passport-azure-ad';
import { azureConfig } from '@config/azure.config';

import { StrategiesEnum } from '@enums/strategies/strategies.enum';
import { UserProviderEnum } from '@enums/user';
import { ProviderService } from 'src/modules/provider/provider.service';
import { AzureResponseInterface } from '@interface/azure/azure.response.interface';
import { UserService } from '@users/users.service';

@Injectable()
export class AzureADStrategy extends PassportStrategy(BearerStrategy, StrategiesEnum.AZURE) {
  constructor(private readonly providerService: ProviderService, private readonly userService: UserService) {
    super(azureConfig);
  }

  async validate(response: AzureResponseInterface) {
    if (!response.oid) throw new Error('Azure response has no Oid');
    const provider = await this.providerService.getProviderByTypeAndOid(response.oid, UserProviderEnum.MICROSOFT);
    if (provider?.user) {
      return provider.user;
    } else {
      // check is email exist
      const hasVerifiedEmail = response.verified_primary_email.length >= 1;
      const hasEmail = response.email || false;

      let email = null;
      if (hasVerifiedEmail) {
        email = response.verified_primary_email[0];
      }
      if (hasEmail) {
        response.email;
      }

      if (!email) return new Error('User has no email');

      const provider = await this.providerService.create({ oid: response.oid });

      const [firstName, lastName] = response.name.split(' ');
      const data = { email, userProviders: [provider], firstName, lastName };
      return await this.userService.create(data);
    }
  }
}
