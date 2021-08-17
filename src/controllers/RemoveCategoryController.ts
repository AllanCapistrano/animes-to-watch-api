import { Request, Response } from "express";

import { RemoveCategoryService } from "../services/RemoveCategoryService";

class RemoveCategoryController {
  /**
   * Método construtor.
   * @param removeCategoryService RemoveCategoryService
   */
  constructor(private removeCategoryService: RemoveCategoryService) {}

  /**
   * Realiza a comunicação entre as requisições e o serviço de remoção das
   * categorias
   * @param request Request
   * @param response Response
   * @returns JSON
   */
  async handle(request: Request, response: Response) {
    if (!request.params) {
      return response
        .status(400)
        .send({ error: "Não foi enviado o identificador da categoria." });
    }

    const categoryId = request.params.id;

    const isRemoved = await this.removeCategoryService.execute({
      id: categoryId,
    });

    if (!isRemoved) {
      return response.status(400).send({
        message: "Não foi possível remover esta categoria! Tente novamente.",
      });
    }

    return response.status(200).send({
      message: "Categoria removida com sucesso!",
    });
  }
}

export { RemoveCategoryController };
