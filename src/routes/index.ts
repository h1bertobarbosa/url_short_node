import { Router } from 'express';
import companyRouter from '@root/src/modules/company/routes/company.router';
import redirectRouter from '@root/src/modules/redirect/routes/redirect.router';
import redirectRouterRouter from '@root/src/modules/redirect/routes/redirectRouter.router';

const routes = Router();

routes.use('/companies', companyRouter);
routes.use('/redirects', redirectRouter);
routes.use('/', redirectRouterRouter);

export default routes;
