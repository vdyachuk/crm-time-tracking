import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from './common/flow/validation.pipe';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import helmet from 'fastify-helmet';
import { contentParser } from 'fastify-multer';

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
    const PORT = process.env.PORT || 5000;
    const config = new DocumentBuilder()
        .setTitle('BACKEND')
        .setDescription('REST API')
        .setVersion('1.0.0')
        .addTag('Time Tracking')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);

    app.useGlobalPipes(new ValidationPipe());

    await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}

bootstrap();
