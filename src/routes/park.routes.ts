import { Router } from 'express';
import { getRepository } from 'typeorm';
import ParkLot from '../entities/ParkLot';
import ParkLotService from '../services/ParkLotService';

const parkLotRouter = Router();

parkLotRouter.post('/', async (request, response) => {
  try {
    const { vehicleId } = request.body;

    const addCar = new ParkLotService();

    const parkLot = await addCar.execute({
      vehicleId,
    });

    return response.json(parkLot);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

parkLotRouter.get('/', async (request, response) => {
  const parkRepository = getRepository(ParkLot);
  const parkedVehicles = parkRepository.find();

  return response.json(parkedVehicles);
});

export default parkLotRouter;
