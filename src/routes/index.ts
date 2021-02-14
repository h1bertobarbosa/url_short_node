import { Router } from 'express';
import companyRouter from '@root/src/modules/company/routes/company.router';
import redirectRouter from '@root/src/modules/redirect/routes/redirect.router';

const routes = Router();

routes.use('/companies', companyRouter);
routes.use('/redirects', redirectRouter);

export default routes;
