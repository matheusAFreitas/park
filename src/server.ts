import 'express-async-errors';
import express from 'express';
import './database';
import error from './errors/error';

import routes from './routes';

const app = express();

app.use(express.json());
app.use(routes);
app.use(error);

app.listen(3333, () => {
  console.log('Server Started');
});
