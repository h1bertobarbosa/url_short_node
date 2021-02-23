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

    const userAgent = request.useragent;

    const redirect = await redirectRouterService.execute({
      url_code: request.params.urlCode,
      ip: String(ip),
      os: userAgent?.os,
      platform: userAgent?.platform,
      browser: userAgent?.browser,
      browser_version: userAgent?.version,
      isBot: userAgent?.isBot,
      isDesktop: userAgent?.isDesktop,
      isMobile: userAgent?.isMobile,
      isAndroid: userAgent?.isAndroid,
      isiPhone: userAgent?.isiPhone,
      isMac: userAgent?.isMac,
      isLinux: userAgent?.isLinux,
      isWindows: userAgent?.isWindows,
    });

    return response.redirect(301, redirect.original_url);
  }
}
