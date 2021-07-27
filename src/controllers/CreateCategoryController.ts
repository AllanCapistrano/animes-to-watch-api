import { Request, Response } from "express";

import { CreateCategoryService } from "../services/CreateCategoryService";

class CreateCategoryController {
  /**
   * Realiza a comunicação entre as requisições e o serviço de criação de 
   * categoria.
   * @param request Request
   * @param response Response
   * @returns JSON
   */
  async handle(request: Request, response: Response) {
    const { name } = request.body;

    const createCategoryService = new CreateCategoryService();

    const category = await createCategoryService.execute({ name });

    return response.json(category);
  }
}

export { CreateCategoryController };
