import { Request, Response } from "express";

import { CreateUserService } from "../services/CreateUserService";

class CreateUserController {
  /**
   * Realiza a comunicação entre as requisições e o serviço de criação de
   * usuário.
   * @param request Request
   * @param response Response
   * @returns JSON
   */
  async handle(request: Request, response: Response) {
    const { name, email, password, avatar } = request.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
      name,
      email,
      password,
      avatar,
    });

    return response.json(user);
  }
}

export { CreateUserController };
