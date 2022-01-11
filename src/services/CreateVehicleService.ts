import { getRepository } from 'typeorm';
import { v4 } from 'uuid';
import Vehicle from '../entities/Vehicle';
import AppError from '../errors/AppError';

interface ICreateVehicle {
  providerId: string;
  marca: string;
  modelo: string;
  cor: string;
  placa: string;
  tipo: string;
}

class CreateVehicleService {
  public async execute({
    providerId,
    marca,
    modelo,
    cor,
    placa,
    tipo,
  }: ICreateVehicle): Promise<Vehicle> {
    const vehicleRepository = getRepository(Vehicle);

    const vehicle = vehicleRepository.create({
      id: v4(),
      providerId,
      marca,
      modelo,
      cor,
      placa,
      tipo,
    });

    const sameVehicle = await vehicleRepository.findOne({
      where: { placa },
    });

    if (sameVehicle) {
      throw new AppError('this vehicle is already in database');
    }

    await vehicleRepository.save(vehicle);

    return vehicle;
  }
}
export default CreateVehicleService;
