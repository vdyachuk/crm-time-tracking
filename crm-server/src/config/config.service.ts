import { get } from '@nestled/config/lib/validate';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getTypeOrmOptions = (): TypeOrmModuleOptions => ({
  type: 'postgres',
  port: get('POSTGRES_PORT').required().asPortNumber(),
  host: get('POSTGRES_HOST').required().asString(),
  username: get('POSTGRES_USER').required().asString(),
  password: get('POSTGRES_PASSWORD').required().asString(),
  database: get('POSTGRES_DATABASE').required().asString(),
  entities: ['dist/**/*.entity.{ts,js}'],
  migrations: ['dist/migrations/*.{ts,js}'],
  migrationsTableName: 'typeorm_migrations',
  logger: 'file',
  synchronize: true,
});
