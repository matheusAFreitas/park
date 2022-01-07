import { getCustomRepository, getRepository } from 'typeorm';
import { uuid } from 'uuidv4';
import Vehicle from '../entities/Vehicle';

interface ICreateVehicle {
  providerId: string;
  marca: string;
  cor: string;
  placa: string;
  tipo: string;
  estabRegistrado: string;
}

class CreateVehicle {
  public async execute({
    providerId,
    marca,
    cor,
    placa,
    tipo,
    estabRegistrado,
  }: ICreateVehicle): Promise<Vehicle> {
    const vehicleRepository = getRepository(Vehicle);

    const vehicle = vehicleRepository.create({
      id: uuid(),
      providerId,
      marca,
      cor,
      placa,
      tipo,
      estabRegistrado,
    });

    await vehicleRepository.save(vehicle);

    return vehicle;
  }
}
