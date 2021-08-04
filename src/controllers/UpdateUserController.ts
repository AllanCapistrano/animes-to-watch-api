import { Request, Response } from "express";

import { UpdateUserService } from "../services/UpdateUserService";

class UpdateUserController {
  /**
   * Método construtor.
   * @param updateUserService UpdateUserService
   */
  constructor(private updateUserService: UpdateUserService) {}

  /**
   * Lida com as requisições e o serviço de atualização das informações do
   * usuário.
   * @param request Request
   * @param response Response
   * @returns JSON
   */
  async handle(request: Request, response: Response) {
    const { name, email, password, avatar } = request.body;
    const userId = request.user_id;

    const user = await this.updateUserService.execute({
      id: userId,
      name,
      email,
      password,
      avatar,
    });

    return response.json(user);
  }
}

export { UpdateUserController };
