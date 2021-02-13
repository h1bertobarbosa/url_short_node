import {
  CompanyRepository,
  CompanyRequestData,
  Company,
} from '@src/modules/company/contracts/Company';

export default class CreateCompanyService {
  constructor(private companyRepository: CompanyRepository) {}
  public async execute(data: CompanyRequestData): Promise<Company> {
    return this.companyRepository.create(data);
  }
}
