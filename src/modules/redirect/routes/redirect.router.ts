import { Router } from 'express';
import RedirectController from '@src/modules/redirect/controllers/RedirectController';
import ensureApiKey from '@src/http/middlewares/ensureApiKey';

const redirectController = new RedirectController();
const redirectRouter = Router();

redirectRouter.use(ensureApiKey);
redirectRouter.post('/', redirectController.store);
redirectRouter.get('/', redirectController.index);

export default redirectRouter;
