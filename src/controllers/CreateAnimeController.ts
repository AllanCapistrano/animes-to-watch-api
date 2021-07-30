import { Request, Response } from "express";

import { CreateAnimeService } from "../services/CreateAnimeService";

class CreateAnimeController {
  /**
   * Realiza a comunicação entre as requisições e o serviço de criação de
   * anime.
   * @param request Request
   * @param response Response
   * @returns JSON
   */
  async handle(request: Request, response: Response) {
    const { name, image, url, description, categories } = request.body;

    const createAnimeService = new CreateAnimeService();

    const anime = await createAnimeService.execute({
      name,
      image,
      url,
      description,
      categories,
    });

    return response.json(anime);
  }
}

export { CreateAnimeController };
