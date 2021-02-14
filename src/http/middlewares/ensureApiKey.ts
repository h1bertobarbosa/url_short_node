import { Request, Response, NextFunction } from 'express';
import AppErrorException from '@src/exceptions/AppErrorException';
import KnexCompanyRepository from '@src/modules/company/repositories/KnexCompanyRepository';
import { FORBIDDEN, UNAUTHORIZED } from '@src/utils/constants.util';

export default async function ensureApiKey(
  request: Request,
  _: Response,
  next: NextFunction,
): Promise<void> {
  const apikeyHeader = request.headers.apikey;
  if (!apikeyHeader) {
    throw new AppErrorException('Api key is missing', FORBIDDEN);
  }

  const repository = new KnexCompanyRepository();
  const company = await repository.findByApiKey(apikeyHeader.toString());

  if (!company) {
    throw new AppErrorException('Invalid apikey', UNAUTHORIZED);
  }

  request.company = company;

  return next();
}
