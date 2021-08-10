import { Request, Response } from "express";

import { UpdateCategoryService } from "../services/UpdateCategoryService";

class UpdateCategoryController {
  /**
   * Método construtor.
   * @param updateCategoryService UpdateCategoryService
   */
  constructor(private updateCategoryService: UpdateCategoryService) {}

  /**
   * Realiza a comunicação entre as requisições e o serviço de atualização das
   * informações da categoria.
   * @param request Request
   * @param response Response
   * @returns JSON
   */
  async handle(request: Request, response: Response) {
    const { id, name } = request.body;

    const category = await this.updateCategoryService.execute({ id, name });

    return response.json(category);
  }
}

export { UpdateCategoryController };
