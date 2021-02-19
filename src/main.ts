import { Request, Response, NextFunction } from 'express';
import express from 'express';
import useragent from 'express-useragent';
import 'express-async-errors';
import cors from 'cors';
import '@src/config/env';
import routes from '@src/routes';
import AppErrorException from '@src/exceptions/AppErrorException';
//import '@src/config/database';
const app = express();
app.use(cors());
app.use(express.json());
app.use(useragent.express());
// app.use('/files', express.static(uploadConfig.uploadsFolder));
// app.use(rateLimiter);
app.use(routes);
// app.use(errors());
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppErrorException) {
    return response.status(err.status).json({
      status: 'error',
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: `Internal server error: ${err.message}`,
  });
});

export default app;
