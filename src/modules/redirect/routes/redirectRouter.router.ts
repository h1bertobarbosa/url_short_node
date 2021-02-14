import { Router } from 'express';
import RedirectRouterController from '@src/modules/redirect/controllers/RedirectRouterController';

const redirectRouterController = new RedirectRouterController();
const redirectRouterRouter = Router();

redirectRouterRouter.get('/:urlCode', redirectRouterController.index);

export default redirectRouterRouter;
