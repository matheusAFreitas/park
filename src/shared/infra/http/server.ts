import 'express-async-errors';
import express from 'express';
import connection from '../typeorm';
import error from '@shared/infra/http/errors/error';

import routes from './routes';

connection();

const app = express();

app.use(express.json());
app.use(routes);
app.use(error);

app.listen(3333, () => {
  console.log('Server Started');
});
