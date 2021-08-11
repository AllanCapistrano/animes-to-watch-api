import { Request, Response } from "express";

import { RemoveUserService } from "../services/RemoveUserService";

class RemoveUserController {
  /**
   * Método construtor.
   * @param removeUserService RemoveUserService
   */
  constructor(private removeUserService: RemoveUserService) {}

  /**
   * Realiza a comunicação entre as requisições e o serviço de remoção de 
   * usuário.
   * @param request Request
   * @param response Response
   * @returns JSON
   */
  async handle(request: Request, response: Response) {
    const userId = request.user_id;

    const isRemoved = await this.removeUserService.execute({
      id: userId,
    });

    if (!isRemoved) {
      return response.status(400).send({
        message: "Não foi possível remover este usuário! Tente novamente.",
      });
    }

    return response.status(200).send({
      message: "Usuário removido com sucesso!",
    });
  }
}

export { RemoveUserController };
