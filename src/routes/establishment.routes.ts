import { Router } from 'express';

import CreateEstablishmentService from '../services/CreateEstablishmentService';

const establishmentRouter = Router();

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
      qtdMoto,
      qtdCarro,
    });

    return response.json(establishment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default establishmentRouter;
