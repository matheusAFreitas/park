import { Router } from 'express';

import establishmentRouter from './establishment.routes';
import parkLotRouter from './park.routes';
import sessionRouter from './session.routes';
import vehicleRouter from './vehicle.routes';

const routes = Router();

routes.use('/establishment', establishmentRouter);
routes.use('/vehicle', vehicleRouter);
routes.use('/session', sessionRouter);
routes.use('/parklot', parkLotRouter);

export default routes;
