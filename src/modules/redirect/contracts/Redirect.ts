import {
  RedirectReport,
  RedirectReportCreateData,
} from '@src/modules/redirect/contracts/RedirectReport';
export interface RedirectRequestData {
  original_url: string;
  url_code?: string;
  external_id?: string;
  company_id: string;
}
export interface Redirect {
  id: string;
  company_id: string;
  original_url: string;
  url_code: string;
  external_id?: string;
  created_at?: Date;
  updated_at?: Date;
}
export interface RedirectRepository {
  create(data: RedirectRequestData): Promise<Redirect | null>;
  findByUrlCode(url_code: string): Promise<Redirect | null>;
  createRedirectReport(
    data: RedirectReportCreateData,
  ): Promise<RedirectReport | null>;
}
