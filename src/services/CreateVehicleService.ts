import { getRepository } from 'typeorm';
import { v4 } from 'uuid';
import Vehicle from '../entities/Vehicle';

interface ICreateVehicle {
  providerId: string;
  marca: string;
  modelo: string;
  cor: string;
  placa: string;
  tipo: string;
  estabRegistrado: string;
}

class CreateVehicleService {
  public async execute({
    providerId,
    marca,
    modelo,
    cor,
    placa,
    tipo,
    estabRegistrado,
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
      estabRegistrado,
    });

    await vehicleRepository.save(vehicle);

    return vehicle;
  }
}
export default CreateVehicleService;
