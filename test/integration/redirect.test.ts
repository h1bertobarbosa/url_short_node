import app from '@src/main';
import request from 'supertest';
import knex from '@src/config/database';
import { Company } from '@src/modules/company/contracts/Company';
import { v4 as uuidv4 } from 'uuid';
import { CREATED } from '@src/utils/constants.util';

let company: Company;
afterEach(async () => {
  await knex('redirects').delete();
  await knex('companies').delete();
});

beforeEach(async () => {
  company = {
    id: uuidv4(),
    name: 'company test',
    email: 'company@gmail.com',
    phone: '(48)999888777',
    apikey: 'apikey',
    active: true,
  };

  await knex<Company>('companies').insert(company);
});

describe('Redirect Tests', () => {
  describe('POST /redirects - create a new redirect url', () => {
    it('shold create a new redirect url', async () => {
      const data = {
        original_url: 'https://google.com',
      };

      const result = await request(app)
        .post('/redirects')
        .set('apikey', company.apikey)
        .send(data)
        .expect(CREATED);
    });
  });
});
