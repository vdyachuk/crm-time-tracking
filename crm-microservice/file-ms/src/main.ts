import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

import { configuration } from './config/configuration';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
        transport: Transport.TCP,
        options: {
            host: configuration.host,
            port: configuration.port
        }
    });
    await app.listen();
}
bootstrap();
