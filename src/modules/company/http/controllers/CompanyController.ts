import { Request, Response } from 'express';
import { CompanyRequestData } from '@src/modules/company/contracts/Company';
import KnexCompanyRepository from '@src/modules/company/repositories/KnexCompanyRepository';
import CreateCompanyService from '@src/modules/company/services/CreateCompanyService';

export default class CompanyController {
  async store(request: Request, response: Response): Promise<Response> {
    const { name, email, phone }: CompanyRequestData = request.body;

    const service = new CreateCompanyService(new KnexCompanyRepository());
    const company = service.execute({ name, email, phone });
    return response.status(201).json({ company });
  }
}
