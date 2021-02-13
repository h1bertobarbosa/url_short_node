import { Router } from 'express';
import CompanyController from '@src/http/controllers/CompanyController';

const companyController = new CompanyController();
const companyRouter = Router();

companyRouter.post('/', companyController.store);

export default companyRouter;
