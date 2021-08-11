import { Request, Response } from "express";

import { CreateUserService } from "../services/CreateUserService";

class CreateUserController {
  /**
   * Método construtor.
   * @param createUserService CreateUserService
   */
  constructor(private createUserService: CreateUserService) {}

  /**
   * Realiza a comunicação entre as requisições e o serviço de criação de
   * usuário.
   * @param request Request
   * @param response Response
   * @returns JSON
   */
  async handle(request: Request, response: Response) {
    const { name, email, password, avatar } = request.body;

    const user = await this.createUserService.execute({
      name,
      email,
      password,
      avatar,
    });

    return response.status(201).json(user);
  }
}

export { CreateUserController };
