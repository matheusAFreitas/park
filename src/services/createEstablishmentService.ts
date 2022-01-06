import { hash } from 'bcryptjs';
import { getRepository } from 'typeorm';
import { v4 } from 'uuid';

import Establishment from '../entities/Establishment';
import AppError from '../errors/AppError';

interface IRequest {
  nome: string;
  CNPJ: string;
  password: string;
  endereco: string;
  telefone: string;
  qtdMoto: number;
  qtdCarro: number;
}

class CreateEstablishmentService {
  async execute({
    nome,
    CNPJ,
    password,
    endereco,
    telefone,
    qtdMoto,
    qtdCarro,
  }: IRequest): Promise<Establishment> {
    const EstablishmentRepository = getRepository(Establishment);

    const checkEstablishmentExists = await EstablishmentRepository.findOne({
      where: { CNPJ },
    });

    if (checkEstablishmentExists) {
      throw new AppError('Establishment already exists');
    }

    const hashedPassword = await hash(password, 8);

    const establishment = EstablishmentRepository.create({
      id: v4(),
      nome,
      CNPJ,
      password: hashedPassword,
      endereco,
      telefone,
      qtdMoto,
      qtdCarro,
    });

    await EstablishmentRepository.save(establishment);

    return establishment;
  }
}

export default CreateEstablishmentService;
