import { getRepository } from 'typeorm';
import { v4 } from 'uuid';

import ParkLot from '../entities/ParkLot';
import AppError from '../errors/AppError';

interface IPark {
  vehicleId: string;
}

class AddParkLotService {
  public async execute({ vehicleId }: IPark): Promise<ParkLot> {
    const parkRepository = getRepository(ParkLot);

    const park = parkRepository.create({
      id: v4(),
      vehicleId,
    });

    const sameVehicle = await parkRepository.findOne({
      where: { vehicleId },
    });

    if (sameVehicle) {
      throw new AppError('This car is already in the park');
    }

    await parkRepository.save(park);

    return park;
  }
}

export default AddParkLotService;
