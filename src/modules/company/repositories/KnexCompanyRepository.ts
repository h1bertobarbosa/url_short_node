import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';
import knex from '@src/config/database';
import {
  CompanyRepository,
  CompanyRequestData,
  Company,
} from '@src/modules/company/contracts/Company';

export default class KnexCompanyRepository implements CompanyRepository {
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

    await knex<Company>('companies').insert(company);

    return company;
  }
}
