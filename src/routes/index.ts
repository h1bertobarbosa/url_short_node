import { Router } from 'express';
import companyRouter from '@src/routes/company.router';
const routes = Router();

routes.use('/companies', companyRouter);

export default routes;
