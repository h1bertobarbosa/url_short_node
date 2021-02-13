import { Router } from 'express';
import companyRouter from '@root/src/modules/company/routes/company.router';
const routes = Router();

routes.use('/companies', companyRouter);

export default routes;
