import {
  RedirectRepository,
  Redirect,
} from '@src/modules/redirect/contracts/Redirect';
import { RedirectReportRequestData } from '@src/modules/redirect/contracts/RedirectReport';
import AppErrorException from '@src/exceptions/AppErrorException';
import { BAD_REQUEST } from '@src/utils/HttpStatusCode.util';

export default class RedirectRouterService {
  constructor(private redirectRepository: RedirectRepository) {}

  async execute({
    url_code,
    ip,
    browser,
    browser_version,
    isBot,
    isDesktop,
    isMobile,
    os,
    platform,
    isAndroid,
    isiPhone,
    isMac,
    isLinux,
  }: RedirectReportRequestData): Promise<Redirect> {
    const redirect = await this.redirectRepository.findByUrlCode(url_code);

    if (!redirect) {
      throw new AppErrorException('Url code not exists', BAD_REQUEST);
    }

    await this.redirectRepository.createRedirectReport({
      ip,
      browser,
      browser_version,
      isBot,
      isDesktop,
      isMobile,
      os,
      platform,
      isAndroid,
      isiPhone,
      isMac,
      isLinux,
      redirect_id: redirect.id,
    });

    return redirect;
  }
}
