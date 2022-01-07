import { Router } from 'express';

import establishmentRouter from './establishment.routes';
import vehicleRouter from './vehicle.routes';
const routes = Router();

routes.use('/establishment', establishmentRouter);
routes.use('/vehicle', vehicleRouter);

export default routes;
