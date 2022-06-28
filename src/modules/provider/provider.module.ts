import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserProvider } from 'src/shared/entities';
import { ProviderService } from './provider.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserProvider])],
  providers: [ProviderService],
  exports: [ProviderService],
})
export class AuthModule {}
