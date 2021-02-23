import { Request, Response } from 'express';
import { CREATED, OK } from '@src/utils/constants.util';
import KnexRedirectRepository from '@src/modules/redirect/repositories/KnexRedirectRepository';
import CreateRedirectService from '@src/modules/redirect/services/CreateRedirectService';
import ListRedirectService from '@src/modules/redirect/services/ListRedirectService';
import { RedirectRequestData } from '@src/modules/redirect/contracts/Redirect';
export default class RedirectController {
  async index(request: Request, response: Response): Promise<Response> {
    const listService = new ListRedirectService(new KnexRedirectRepository());
    const currentPage = request.query.page || 1;
    const perPage = request.query.perPage || 10;

    const redirects = await listService.execute({
      company_id: request.company.id,
      currentPage: Number(currentPage),
      perPage: Number(perPage),
    });

    return response.status(OK).json({
      code: 'redirect.list.success',
      data: redirects.data,
      pagination: redirects.pagination,
    });
  }

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
