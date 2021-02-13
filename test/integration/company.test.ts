import app from '@src/main';
import request from 'supertest';
import knex from '@src/config/database';

afterEach(async () => {
  await knex('companies').delete();
});

describe('Company Tests', () => {
  describe('POST /companies - create a new company', () => {
    it('Hello API Request', async () => {
      const data = {
        name: 'Company name',
        email: 'email@gmail.com',
        phone: '(48)991 669 898',
      };
      const result = await request(app)
        .post('/companies')
        .send(data);

      expect(result.status).toEqual(201);
    });
  });
});
