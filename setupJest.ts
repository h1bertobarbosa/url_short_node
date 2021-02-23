import knex from './src/config/database';

afterAll(() => knex.destroy());
