import { Request, Response } from "express";

import { CreateCategoryService } from "../services/CreateCategoryService";

class CreateCategoryController {
  /**
   * Método Construtor.
   * @param createCategoryService CreateCategoryService
   */
  constructor(private createCategoryService: CreateCategoryService) {}

  /**
   * Realiza a comunicação entre as requisições e o serviço de criação de
   * categoria.
   * @param request Request
   * @param response Response
   * @returns JSON
   */
  async handle(request: Request, response: Response) {
    const { name } = request.body;

    const category = await this.createCategoryService.execute({ name });

    return response.status(201).json(category);
  }
}

export { CreateCategoryController };
