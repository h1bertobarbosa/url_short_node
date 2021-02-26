import app from '@src/main';
import request from 'supertest';
import { UNAUTHORIZED, FORBIDDEN } from '@src/utils/HttpStatusCode.util';

describe('Redirect Tests', () => {
  describe('POST /redirects - create a new redirect url', () => {
    it('shold validate if apikey is valide on create a new redirect url', async () => {
      const data = {
        original_url: 'https://google.com',
      };
      const result = await request(app)
        .post('/redirects')
        .set('apikey', 'lalalala')
        .send(data)
        .expect(UNAUTHORIZED);

      expect(result.body.message).toEqual('Invalid apikey');
    });

    it('shold validate if apikey is not null on create a new redirect url', async () => {
      const data = {
        original_url: 'https://google.com',
      };
      const result = await request(app)
        .post('/redirects')
        .send(data)
        .expect(FORBIDDEN);

      expect(result.body.message).toEqual('Api key is missing');
    });
  });
});
