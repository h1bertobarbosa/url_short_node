import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';
import { IWithPagination } from 'knex-paginate';
import knex from '@src/config/database';
import {
  RedirectRepository,
  RedirectRequestData,
  Redirect,
  ListRedirectRequestData,
} from '@src/modules/redirect/contracts/Redirect';
import {
  RedirectReport,
  RedirectReportCreateData,
} from '@src/modules/redirect/contracts/RedirectReport';
export default class KnexRedirectRepository implements RedirectRepository {
  private redirectQueryBuilder;

  constructor() {
    this.redirectQueryBuilder = knex<Redirect>('redirects');
  }

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

    const created = await this.redirectQueryBuilder
      .insert(redirect)
      .returning('*');

    return created.pop() || null;
  }

  async findByUrlCode(url_code: string): Promise<Redirect | null> {
    const redirect = await this.redirectQueryBuilder
      .where({ url_code })
      .select('*')
      .first();

    if (!redirect) {
      return null;
    }

    return redirect;
  }

  async createRedirectReport(
    data: RedirectReportCreateData,
  ): Promise<RedirectReport | null> {
    const redirectReport = await knex<RedirectReport>('redirects_report')
      .insert({ ...data, id: uuidv4() })
      .returning('*');

    return redirectReport.pop() || null;
  }

  async findByCompany({
    company_id,
    perPage = 10,
    currentPage = 1,
  }: ListRedirectRequestData): Promise<IWithPagination> {
    return this.redirectQueryBuilder
      .where({ company_id })
      .select('*')
      .paginate({ perPage, currentPage });
  }
}
