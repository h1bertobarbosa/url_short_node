import { Request, Response } from 'express';
import KnexRedirectRepository from '@src/modules/redirect/repositories/KnexRedirectRepository';
import RedirectRouterService from '@src/modules/redirect/services/RedirectRouterService';

export default class RedirectRouterController {
  async index(request: Request, response: Response): Promise<void> {
    const redirectRouterService = new RedirectRouterService(
      new KnexRedirectRepository(),
    );

    let ip = request.headers['x-real-ip'] || request.headers['x-forwarded-for'];
    if (!ip) {
      ip = request.connection.remoteAddress;
    }

    const redirect = await redirectRouterService.execute({
      url_code: request.params.urlCode,
      ip: String(ip),
      os: request.useragent?.os,
      platform: request.useragent?.platform,
      browser: request.useragent?.browser,
      browser_version: request.useragent?.version,
      isBot: request.useragent?.isBot,
      isDesktop: request.useragent?.isDesktop,
      isMobile: request.useragent?.isMobile,
    });

    return response.redirect(301, redirect.original_url);
  }
}
