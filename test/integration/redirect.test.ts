import app from '@src/main';
import request from 'supertest';
import knex from '@src/config/database';
import { Company } from '@src/modules/company/contracts/Company';
import { v4 as uuidv4 } from 'uuid';
import {
  CREATED,
  BAD_REQUEST,
  MOVED_PERMANENTLY,
} from '@src/utils/constants.util';
import { Redirect } from '@root/src/modules/redirect/contracts/Redirect';

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

      expect(result.body.code).toEqual('redirect.created.success');
      expect(result.body.data).toHaveProperty('id');
    });
  });

  it('shold validate if urlcode is unique when create a new redirect url', async () => {
    const data = {
      original_url: 'https://google.com',
      url_code: 'qwe23',
    };

    await knex<Redirect>('redirects').insert({ ...data, id: uuidv4() });

    const result = await request(app)
      .post('/redirects')
      .set('apikey', company.apikey)
      .send(data)
      .expect(BAD_REQUEST);

    expect(result.body.message).toEqual('Url code already exists');
  });

  describe('GET /{hash} - redirect 301 to original url', () => {
    it('shold validate if url code not exists', async () => {
      const data = {
        id: uuidv4(),
        original_url: 'https://google.com',
        url_code: uuidv4(),
      };
      await knex<Redirect>('redirects')
        .insert(data)
        .returning('*');

      const result = await request(app)
        .get('/some-hash')
        .set('apikey', company.apikey)
        .send(data)
        .expect(BAD_REQUEST);
      expect(result.body.message).toEqual('Url code not exists');
    });

    it('shold create a new redirect url', async () => {
      const data = {
        id: uuidv4(),
        original_url: 'https://google.com',
        url_code: uuidv4(),
      };
      const createdRed = await knex<Redirect>('redirects')
        .insert(data)
        .returning('*');

      const result = await request(app)
        .get(`/${createdRed[0].url_code}`)
        .set('apikey', company.apikey)
        .send(data)
        .expect(MOVED_PERMANENTLY);

      expect(result.text).toEqual(
        `Moved Permanently. Redirecting to ${data.original_url}`,
      );
    });
  });
});
