import app from '@src/main';
import request from 'supertest';
import knex from '@src/config/database';
import { CREATED } from '@src/utils/HttpStatusCode.util';

afterEach(async () => {
  await knex('companies').delete();
});

describe('Company Tests', () => {
  describe('POST /companies - create a new company', () => {
    it('should create a new company', async () => {
      const data = {
        name: 'Company name',
        email: 'email@gmail.com',
        phone: '(48)991 669 898',
      };
      const result = await request(app)
        .post('/companies')
        .send(data)
        .expect(CREATED);

      expect(result.body.code).toEqual('company.create.success');
      expect(result.body.data).toHaveProperty('id');
    });
  });
});
