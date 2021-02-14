import { Request, Response } from 'express';
import { CREATED } from '@src/utils/constants.util';
import KnexRedirectRepository from '@src/modules/redirect/repositories/KnexRedirectRepository';
import CreateRedirectService from '@src/modules/redirect/services/CreateRedirectService';
import { RedirectRequestData } from '@src/modules/redirect/contracts/Redirect';
export default class RedirectController {
  async store(request: Request, response: Response): Promise<Response> {
    const { original_url, external_id, url_code } = request.body;

    const requestData: RedirectRequestData = {
      original_url,
      company_id: request.company.id,
      external_id,
      url_code,
    };

    const createService = new CreateRedirectService(
      new KnexRedirectRepository(),
    );

    const redirect = await createService.execute(requestData);

    return response
      .status(CREATED)
      .json({ code: 'redirect.created.success', data: redirect });
  }
}
