import { Request, Response } from "express";

import { CreateAnimeService } from "../services/CreateAnimeService";

class CreateAnimeController {
  /**
   * Método construtor.
   * @param createAnimeService CreateAnimeService
   */
  constructor(private createAnimeService: CreateAnimeService) {}

  /**
   * Realiza a comunicação entre as requisições e o serviço de criação de
   * anime.
   * @param request Request
   * @param response Response
   * @returns JSON
   */
  async handle(request: Request, response: Response) {
    const { name, image, url, description, categories } = request.body;

    const anime = await this.createAnimeService.execute({
      name,
      image,
      url,
      description,
      categories,
    });

    return response.status(201).json(anime);
  }
}

export { CreateAnimeController };
