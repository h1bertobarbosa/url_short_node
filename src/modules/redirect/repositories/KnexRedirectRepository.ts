import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';
import knex from '@src/config/database';
import {
  RedirectRepository,
  RedirectRequestData,
  Redirect,
} from '@src/modules/redirect/contracts/Redirect';

export default class KnexRedirectRepository implements RedirectRepository {
  async create({
    original_url,
    company_id,
    url_code,
    external_id,
  }: RedirectRequestData): Promise<Redirect | null> {
    const redirect: Redirect = {
      id: uuidv4(),
      company_id,
      original_url,
      url_code: url_code || crypto.randomBytes(6).toString('hex'),
      external_id,
    };
    const created = await knex<Redirect>('redirects')
      .insert(redirect)
      .returning('*');

    return created.pop() || null;
  }
}
