import { Request, Response } from "express";

import { UpdateAnimeService } from "../services/UpdateAnimeService";

class UpdateAnimeController {
  /**
   * Método construtor.
   * @param updateAnimeService UpdateAnimeService
   */
  constructor(private updateAnimeService: UpdateAnimeService) {}

  /**
   * Realiza a comunicação entre as requisições e o serviço de atualização das
   * informações de um anime.
   * @param request Request
   * @param response Response
   * @returns JSON
   */
  async handle(request: Request, response: Response) {
    const { id, name, image, url, description, categories } = request.body;

    const anime = await this.updateAnimeService.execute({
      id,
      name,
      image,
      url,
      description,
      categories,
    });

    return response.json(anime);
  }
}

export { UpdateAnimeController };
