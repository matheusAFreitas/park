import { Router } from 'express';
import { getRepository } from 'typeorm';

import ParkLot from '../entities/ParkLot';
import ensureAuthenticate from '../middlewares/ensureAuthenticate';
import AddParkLotService from '../services/AddParkLotService';
import DeleteParkLotService from '../services/DeleteParkLotService';

const parkLotRouter = Router();

parkLotRouter.use(ensureAuthenticate);

parkLotRouter.get('/', async (request, response) => {
  const parkRepository = getRepository(ParkLot);
  const parkedVehicles = await parkRepository.find();

  return response.json(parkedVehicles);
});

parkLotRouter.post('/', async (request, response) => {
  try {
    const { vehicleId } = request.body;

    const addCar = new AddParkLotService();

    const parkLot = await addCar.execute({
      vehicleId,
    });

    return response.json(parkLot);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

parkLotRouter.delete('/:id', async (request, response) => {
  const id = request.params.id;

  const deleteParkLot = new DeleteParkLotService();

  await deleteParkLot.execute({
    id,
  });

  return response.json({
    message: 'car removed from parklot',
  });
});

export default parkLotRouter;
