import { Router } from 'express';
import { getRepository } from 'typeorm';
import Establishments from '../entities/Establishments';

import CreateEstablishmentService from '../services/CreateEstablishmentService';
import DeleteEstablishmentService from '../services/DeleteEstablishmentService';

const establishmentRouter = Router();

establishmentRouter.get('/', async (request, response) => {
  const establishmentRepository = getRepository(Establishments);

  const establishments = await establishmentRepository.find();

  establishments.forEach((establishment) => {
    delete establishment.password;
  });

  return response.json(establishments);
});

establishmentRouter.post('/', async (request, response) => {
  try {
    const { nome, CNPJ, password, endereco, telefone, qtdMoto, qtdCarro } =
      request.body;

    const createEstablishment = new CreateEstablishmentService();

    const establishment = await createEstablishment.execute({
      nome,
      CNPJ,
      password,
      endereco,
      telefone,
    });

    delete establishment.password;

    return response.json(establishment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

establishmentRouter.delete('/:id', async (request, response) => {
  const id = request.params.id;

  const deleteEstablishment = new DeleteEstablishmentService();

  await deleteEstablishment.execute({
    id,
  });

  return response.json({
    message: 'establishment removed successfully',
  });
});

export default establishmentRouter;
