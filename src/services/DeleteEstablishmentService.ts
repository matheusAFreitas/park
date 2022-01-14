import { getRepository } from 'typeorm';
import Establishments from '../entities/Establishments';
import AppError from '../errors/AppError';

interface IDeleteEstablishmentService {
  id: string;
}

class DeleteEstablishmentService {
  public async execute({ id }: IDeleteEstablishmentService) {
    const establishmentRepository = getRepository(Establishments);
    const establishment = await establishmentRepository.findOne({
      where: {
        id,
      },
    });

    if (!establishment) {
      throw new AppError('cannot find the establishment', 404);
    }

    await establishmentRepository.delete(establishment.id);
  }
}

export default DeleteEstablishmentService;
