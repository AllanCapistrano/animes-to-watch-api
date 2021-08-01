import { Request, Response } from "express";

import { AuthenticateUserService } from "../services/AuthenticateUserService";

class AuthenticateUserController {
  /**
   * Método construtor.
   * @param authenticateUserService AuthenticateUserService
   */
  constructor(private authenticateUserService: AuthenticateUserService) {}

  /**
   * Realiza a comunicação entre as requisições e o serviço de autenticação do
   * usuário.
   * @param request Request
   * @param response Response
   * @returns JSON
   */
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    const token = await this.authenticateUserService.execute({
      email,
      password,
    });

    return response.json(token);
  }
}

export { AuthenticateUserController };
