import { getRepository } from 'typeorm';
import ParkLot from '@modules/parkLot/infra/typeorm/entities/ParkLot';
import AppError from '@shared/errors/AppError';

interface IDeleteParkLotService {
  id: string;
}

class DeleteParkLotService {
  public async execute({ id }: IDeleteParkLotService) {
    const parkLotRepository = getRepository(ParkLot);
    const parkLot = await parkLotRepository.findOne({
      where: {
        id,
      },
    });

    if (!parkLot) {
      throw new AppError('cannot find this car in the park lot', 404);
    }
    await parkLotRepository.delete(parkLot.id);
  }
}

export default DeleteParkLotService;
