import { Router } from 'express';
import CreateVehicleService from '../services/CreateVehicleService';

const vehicleRouter = Router();

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
      estabRegistrado,
    });

    return response.json(vehicle);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default vehicleRouter;
