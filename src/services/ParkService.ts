import { getRepository } from 'typeorm';
import { v4 } from 'uuid';

import ParkLot from '../entities/ParkLot';
import AppError from '../errors/AppError';

interface IPark {
  vehicleId: string;
  size: number;
}

class ParkService {
  public async execute({ vehicleId, size }: IPark): Promise<ParkLot> {
    const parkRepository = getRepository(ParkLot);

    const park = parkRepository.create({
      id: v4(),
      vehicleId,
      size,
    });

    const sameVehicle = await parkRepository.findOne({
      where: { vehicleId },
    });

    if (sameVehicle) {
      throw new AppError('This car is already in the park');
    }

    return park;
  }
}
