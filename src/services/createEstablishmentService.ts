import { hash } from 'bcryptjs';
import { getRepository } from 'typeorm';
import { v4 } from 'uuid';

import Establishments from '../entities/Establishments';
import AppError from '../errors/AppError';

interface IRequest {
  nome: string;
  CNPJ: string;
  password: string;
  endereco: string;
  telefone: string;
}

class CreateEstablishmentService {
  async execute({
    nome,
    CNPJ,
    password,
    endereco,
    telefone,
  }: IRequest): Promise<Establishments> {
    const establishmentRepository = getRepository(Establishments);

    const checkEstablishmentExists = await establishmentRepository.findOne({
      where: { CNPJ },
    });

    if (checkEstablishmentExists) {
      throw new AppError('Establishment already exists');
    }

    const hashedPassword = await hash(password, 8);

    const establishment = establishmentRepository.create({
      id: v4(),
      nome,
      CNPJ,
      password: hashedPassword,
      endereco,
      telefone,
    });

    await establishmentRepository.save(establishment);

    return establishment;
  }
}

export default CreateEstablishmentService;
