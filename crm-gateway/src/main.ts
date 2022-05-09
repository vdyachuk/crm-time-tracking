import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { contentParser } from 'fastify-multer';
import helmet from 'fastify-helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

import { configuration } from './config/configuration';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

    app.register(helmet, {
        contentSecurityPolicy: {
            directives: {
                defaultSrc: [`'self'`],
                styleSrc: [`'self'`, `'unsafe-inline'`],
                imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
                scriptSrc: [`'self'`, `https: 'unsafe-inline'`]
            }
        }
    });

    app.register(contentParser);

    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    const options = new DocumentBuilder()
        .setTitle('X - API')
        .setDescription('API Gateway')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);

    await app.listen(configuration.port);
}

bootstrap();
