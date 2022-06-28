import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '@users/users.module';

import { User } from '@entities/user.entity';
import { UserProvider } from '@entities/userProvider.entity';

import { JwtStrategy } from '@strategies/jwt.strategy.configuration';
import { LocalStrategy } from '@strategies/local.strategy.configuration';
import { configService } from '@config/config.service';
import { AzureADStrategy } from '@strategies/azure.strategy.configuration';

import { ProviderService } from '../provider/provider.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SessionSerializer } from './session.serializer';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([User, UserProvider]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: configService.getAppSecret(),
      signOptions: {
        expiresIn: configService.getJwtExpired(),
        algorithm: 'HS384',
      },
      verifyOptions: {
        algorithms: ['HS384'],
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    ConfigService,
    ProviderService,
    LocalStrategy,
    JwtStrategy,
    AzureADStrategy,
    SessionSerializer,
  ],
})
export class AuthModule {}
