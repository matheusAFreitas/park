import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import AppError from '../errors/AppError';
import authConfig from '../config/auth';
import Establishments from '../entities/Establishments';

interface IRequest {
  CNPJ: string;
  password: string;
}

interface IResponse {
  establishments: Establishments;
  token: string;
}

class AuthenticateEstablishmentService {
  public async execute({ CNPJ, password }: IRequest): Promise<IResponse> {
    const establishmentRepository = getRepository(Establishments);

    const establishments = await establishmentRepository.findOne({
      where: { CNPJ },
    });

    if (!establishments) {
      throw new AppError('Incorrect credentials', 401);
    }

    const passwordMatch = await compare(password, establishments.password);

    if (!passwordMatch) {
      throw new AppError('Incorrect credentials', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: establishments.id,
      expiresIn,
    });

    return {
      establishments,
      token,
    };
  }
}

export default AuthenticateEstablishmentService;
