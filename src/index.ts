import express, { Express } from 'express';
import { json } from 'body-parser';
import { SERVER_ENV, SERVER_PORT, CONFIG_DB } from './utils/config';
//database
import dbInit from './database/models/index';
//api
import commonRoutes from './api/common/routes/index';
import userRoutes from './api/common/routes/user';
//middleware
import errorHandler from './middleware/errorHandler';

const app: Express = express();
app.use(json());
app.use('/api', commonRoutes);

app.use(errorHandler);

app.listen(SERVER_PORT, () => {
  dbInit();
  console.log(
    `server listing to port ${SERVER_PORT} | environment: ${SERVER_ENV}`
  );
});
