import {
  Company,
} from '@src/modules/company/contracts/Company';
declare global{
  namespace Express {
    interface Request {
        company: Company
    }
  }
}