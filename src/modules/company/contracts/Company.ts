export interface Company {
  id: string;
  name: string;
  email: string;
  phone?: string;
  apikey: string;
  active: boolean;
}

export interface CompanyRequestData {
  name: string;
  email: string;
  phone?: string;
  apikey?: string;
  active?: boolean;
}

export interface CompanyRepository {
  create(data: CompanyRequestData): Promise<Company>;
}
