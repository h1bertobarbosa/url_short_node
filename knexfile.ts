// Update with your config settings.
import { Config } from 'knex';
import dotenv from 'dotenv';
const path = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';
dotenv.config({ path });

const knexConfig: Config = {
  client: 'postgresql',
  connection: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_NAME,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'migrations',
    directory: './src/database/migrations',
  },
};

export default knexConfig;
