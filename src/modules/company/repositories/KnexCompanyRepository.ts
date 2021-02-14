import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';
import knex from '@src/config/database';
import {
  CompanyRepository,
  CompanyRequestData,
  Company,
} from '@src/modules/company/contracts/Company';

export default class KnexCompanyRepository implements CompanyRepository {
  private companyQueryBuilder;
  constructor() {
    this.companyQueryBuilder = knex<Company>('companies');
  }

  async create({ name, email, phone }: CompanyRequestData): Promise<Company> {
    const apikey = crypto.randomBytes(32).toString('hex');
    const company: Company = {
      id: uuidv4(),
      name,
      email,
      phone,
      apikey,
      active: true,
    };

    await this.companyQueryBuilder.insert(company);

    return company;
  }

  async findByApiKey(apikey: string): Promise<Company | null> {
    const company = await this.companyQueryBuilder
      .where({ apikey })
      .select('*')
      .first();

    if (!company) {
      return null;
    }

    return company;
  }
}
