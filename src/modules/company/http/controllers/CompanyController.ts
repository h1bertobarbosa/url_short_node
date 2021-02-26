import { Request, Response } from 'express';
import { CompanyRequestData } from '@src/modules/company/contracts/Company';
import KnexCompanyRepository from '@src/modules/company/repositories/KnexCompanyRepository';
import CreateCompanyService from '@src/modules/company/services/CreateCompanyService';
import { CREATED } from '@src/utils/HttpStatusCode.util';

export default class CompanyController {
  async store(request: Request, response: Response): Promise<Response> {
    const { name, email, phone }: CompanyRequestData = request.body;

    const service = new CreateCompanyService(new KnexCompanyRepository());
    const company = await service.execute({ name, email, phone });

    return response
      .status(CREATED)
      .json({ code: 'company.create.success', data: company });
  }
}
