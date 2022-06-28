import { cleanEnv, num, str } from 'envalid';

const env = cleanEnv(process.env, {
  POSTGRES_HOST: str(),
  POSTGRES_PORT: num({ default: 5432 }),
  POSTGRES_USERNAME: str(),
  POSTGRES_PASSWORD: str(),
  POSTGRES_DATABASE: str(),
});

export const postgresConfig = {
  type: 'postgres' as const,

  host: env.POSTGRES_HOST,
  port: env.POSTGRES_PORT,
  username: env.POSTGRES_USERNAME,
  password: env.POSTGRES_PASSWORD,
  database: env.POSTGRES_DATABASE,

  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: [__dirname + '/../../../typeorm/migrations/*{.ts, .js}'],
  subscribers: [__dirname + '/../../../typeorm/subscriber/*{.ts, .js}'],
};
