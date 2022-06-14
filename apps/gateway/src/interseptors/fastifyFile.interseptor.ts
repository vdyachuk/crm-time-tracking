import {
    CallHandler,
    ExecutionContext,
    Inject,
    InternalServerErrorException,
    mixin,
    NestInterceptor,
    Optional,
    Type,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import FastifyMulter from 'fastify-multer';
import { Options, Multer } from 'multer';

type MulterInstance = any;

export function FastifyFilesInterceptor(
    fieldName: string,
    maxCount?: number,
    localOptions?: Options,
): Type<NestInterceptor> {
    class MixinInterceptor implements NestInterceptor {
        protected multer: MulterInstance;

        constructor(
            @Optional()
            @Inject('MULTER_MODULE_OPTIONS')
            options: Multer,
        ) {
            this.multer = (FastifyMulter as any)({ ...options, ...localOptions });
        }

        async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
            const ctx = context.switchToHttp();

            await new Promise<void>((resolve, reject) =>
                this.multer.array(fieldName, maxCount)(
                    ctx.getRequest(),
                    ctx.getResponse(),
                    (error: any) => {
                        if (error) {
                            return reject(error);
                        }
                        resolve();
                    },
                ),
            );

            return next.handle();
        }
    }

    const Interceptor = mixin(MixinInterceptor);
    return Interceptor as Type<NestInterceptor>;
}

export const xlsFileFilter = (req: Request, file: Express.Multer.File, callback) => {
    if (!file.originalname.match(/\.(xls|xlsx)$/)) {
        return callback(new InternalServerErrorException('Only excel files are allowed!'), false);
    }
    callback(null, true);
};
