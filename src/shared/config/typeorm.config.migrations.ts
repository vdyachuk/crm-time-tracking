import 'dotenv/config';
import { postgresConfig } from './postgres.config';
import { DataSource } from 'typeorm';

export default new DataSource(postgresConfig);
