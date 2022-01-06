import { Router } from 'express';

import establishmentRouter from './establishment.routes';

const routes = Router();

routes.use('/establishment', establishmentRouter);

export default routes;
