import {
  RedirectRequestData,
  RedirectRepository,
  Redirect,
} from '@src/modules/redirect/contracts/Redirect';
import AppErrorException from '@src/exceptions/AppErrorException';
import { BAD_REQUEST } from '@src/utils/constants.util';

export default class RedirectRouterService {
  constructor(private redirectRepository: RedirectRepository) {}

  async execute(url_code: string): Promise<Redirect> {
    const redirect = await this.redirectRepository.findByUrlCode(url_code);

    if (!redirect) {
      throw new AppErrorException('Url code not exists', BAD_REQUEST);
    }

    return redirect;
  }
}
