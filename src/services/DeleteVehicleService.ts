import { getRepository } from 'typeorm';
import Vehicle from '../entities/Vehicle';
import AppError from '../errors/AppError';

interface IDeleteVehicleService {
  id: string;
}
class DeleteVehicleService {
  public async execute({ id }: IDeleteVehicleService) {
    const vehicleRepository = getRepository(Vehicle);
    const vehicle = await vehicleRepository.findOne({
      where: {
        id,
      },
    });

    if (!vehicle) {
      throw new AppError('cannot find the vehicle', 404);
    }
    await vehicleRepository.delete(vehicle.id);
  }
}

export default DeleteVehicleService;
