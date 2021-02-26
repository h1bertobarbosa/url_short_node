import {
  RedirectRequestData,
  RedirectRepository,
  Redirect,
} from '@src/modules/redirect/contracts/Redirect';
import AppErrorException from '@src/exceptions/AppErrorException';
import { BAD_REQUEST } from '@src/utils/HttpStatusCode.util';

export default class CreateRedirectService {
  constructor(private redirectRepository: RedirectRepository) {}

  async execute(data: RedirectRequestData): Promise<Redirect | null> {
    if (data.url_code) {
      const hasRedirect = await this.redirectRepository.findByUrlCode(
        data.url_code,
      );

      if (hasRedirect) {
        throw new AppErrorException('Url code already exists', BAD_REQUEST);
      }
    }

    return this.redirectRepository.create(data);
  }
}
