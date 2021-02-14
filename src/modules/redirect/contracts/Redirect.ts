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
}
