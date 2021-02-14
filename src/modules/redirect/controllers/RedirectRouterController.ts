import { Request, Response } from 'express';
import KnexRedirectRepository from '@src/modules/redirect/repositories/KnexRedirectRepository';
import RedirectRouterService from '@src/modules/redirect/services/RedirectRouterService';

export default class RedirectRouterController {
  async index(request: Request, response: Response): Promise<void> {
    const redirectRouterService = new RedirectRouterService(
      new KnexRedirectRepository(),
    );

    const redirect = await redirectRouterService.execute(
      request.params.urlCode,
    );

    return response.redirect(301, redirect.original_url);
  }
}
