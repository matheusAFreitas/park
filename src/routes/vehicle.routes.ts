import { Router } from 'express';
import { getRepository } from 'typeorm';
import Vehicle from '../entities/Vehicle';
import ensureAuthenticate from '../middlewares/ensureAuthenticate';
import CreateVehicleService from '../services/CreateVehicleService';

const vehicleRouter = Router();

vehicleRouter.use(ensureAuthenticate);

vehicleRouter.post('/', async (request, response) => {
  try {
    const { providerId, marca, modelo, cor, placa, tipo, estabRegistrado } =
      request.body;

    const createVehicle = new CreateVehicleService();

    const vehicle = await createVehicle.execute({
      providerId,
      marca,
      modelo,
      cor,
      placa,
      tipo,
    });

    return response.json(vehicle);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

vehicleRouter.get('/', async (request, response) => {
  const vehicleRepository = getRepository(Vehicle);
  const vehicle = await vehicleRepository.find();

  return response.json(vehicle);
});

export default vehicleRouter;
