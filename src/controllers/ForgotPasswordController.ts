import { Request, Response } from "express";

import { ForgotPasswordService } from "../services/ForgotPasswordService";

class ForgotPasswordController {
  /**
   * Método construtor.
   * @param forgotPasswordService ForgotPasswordService
   */
  constructor(private forgotPasswordService: ForgotPasswordService) {}

  /**
   * Realiza a comunicação entre as requisições e o serviço de alteração de
   * senhas.
   * @param request Request
   * @param response Response
   * @returns JSON
   */
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    const isPasswordUpdated = await this.forgotPasswordService.execute({
      email,
      newPassword: password,
    });

    if (!isPasswordUpdated) {
      return response.status(500).send({
        error: "O servidor não conseguiu alterar a senha.",
      });
    }

    return response.status(200).send({
      data: "Senha alterada com sucesso.",
    });
  }
}

export { ForgotPasswordController };
