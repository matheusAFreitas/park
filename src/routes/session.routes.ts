import { Router } from 'express';
import AuthenticateEstablishmentService from '../services/AuthenticateEstablishmentService';

const sessionRouter = Router();

sessionRouter.post('/', async (request, response) => {
  const { CNPJ, password } = request.body;

  const authenticateEstablishment = new AuthenticateEstablishmentService();

  const { establishments, token } = await authenticateEstablishment.execute({
    CNPJ,
    password,
  });

  delete establishments.password;

  return response.json({ establishments, token });
});

export default sessionRouter;
