import { Request, Response } from "express";

import { ListCategoriesService } from "../services/ListCategoriesService";

class ListCategoriesController {
  /**
   * Método construtor.
   * @param listCategoriesService ListCategoriesService
   */
  constructor(private listCategoriesService: ListCategoriesService) {}

  /**
   * Realiza a comunicação entre as requisições e o serviço de listagem de
   * categorias.
   * @param request Request
   * @param response Response
   * @returns JSON
   */
  async handle(request: Request, response: Response) {
    const categories = await this.listCategoriesService.execute();

    if (categories.length === 0) {
      return response.json({
        message: "Não há nenhuma categoria cadastrada no momento.",
      });
    }

    return response.json(categories);
  }
}

export { ListCategoriesController };
