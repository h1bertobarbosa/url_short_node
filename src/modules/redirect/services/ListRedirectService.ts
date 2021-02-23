import {
  RedirectRepository,
  ListRedirectRequestData,
} from '@src/modules/redirect/contracts/Redirect';
import { IWithPagination } from 'knex-paginate';

export default class ListRedirectService {
  constructor(private redirectRepository: RedirectRepository) {}

  async execute(data: ListRedirectRequestData): Promise<IWithPagination> {
    return this.redirectRepository.findByCompany(data);
  }
}
