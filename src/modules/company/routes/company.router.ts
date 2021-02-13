import { Router } from 'express';
import CompanyController from '@src/modules/company/http/controllers/CompanyController';

const companyController = new CompanyController();
const companyRouter = Router();

companyRouter.post('/', companyController.store);

export default companyRouter;
