import { Router } from 'express';

import establishmentRouter from './establishment.routes';
import sessionRouter from './session.routes';
import vehicleRouter from './vehicle.routes';
const routes = Router();

routes.use('/establishment', establishmentRouter);
routes.use('/vehicle', vehicleRouter);
routes.use('/session', sessionRouter);

export default routes;
