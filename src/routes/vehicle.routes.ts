import { Router } from 'express';
import { getRepository } from 'typeorm';

import Vehicle from '../entities/Vehicle';
import ensureAuthenticate from '../middlewares/ensureAuthenticate';
import CreateVehicleService from '../services/CreateVehicleService';
import DeleteVehicleService from '../services/DeleteVehicleService';

const vehicleRouter = Router();

vehicleRouter.use(ensureAuthenticate);

vehicleRouter.get('/', async (request, response) => {
  const vehicleRepository = getRepository(Vehicle);
  const vehicle = await vehicleRepository.find();

  return response.json(vehicle);
});

vehicleRouter.get('/establishment', async (request, response) => {
  const providerId = request.establishments.id;

  const vehicleRepository = getRepository(Vehicle);
  const vehicle = await vehicleRepository.find({
    where: {
      providerId,
    },
  });

  return response.json(vehicle);
});

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

vehicleRouter.delete('/:id', async (request, response) => {
  const id = request.params.id;

  const deleteVehicle = new DeleteVehicleService();

  await deleteVehicle.execute({
    id,
  });

  return response.json({
    message: 'Vehicle removed successfully',
  });
});

export default vehicleRouter;
