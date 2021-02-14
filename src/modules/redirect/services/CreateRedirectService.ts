import {
  RedirectRequestData,
  RedirectRepository,
  Redirect,
} from '@src/modules/redirect/contracts/Redirect';

export default class CreateRedirectService {
  constructor(private redirectRepository: RedirectRepository) {}

  async execute(data: RedirectRequestData): Promise<Redirect | null> {
    return this.redirectRepository.create(data);
  }
}
