import { Request, Response } from 'express';
import knex from '@src/config/database';
import { v4 as uuidv4 } from 'uuid';
interface Company {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  apikey?: string;
  active?: boolean;
}

export default class CompanyController {
  async store(request: Request, response: Response): Promise<Response> {
    const { name, email, phone }: Company = request.body;
    const res = await knex<Company>('companies').insert({
      id: uuidv4(),
      name,
      email,
      phone,
      apikey: uuidv4(),
      active: true,
    });

    return response.status(201).json({ company: res });
  }
}
