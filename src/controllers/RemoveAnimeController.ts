import { Request, Response } from "express";

import { RemoveAnimeService } from "../services/RemoveAnimeService";

class RemoveAnimeController {
  /**
   * Método construtor.
   * @param removeAnimeService RemoveAnimeService
   */
  constructor(private removeAnimeService: RemoveAnimeService) {}

  /**
   * Realiza a comunicação entre as requisições e o serviço de remoção de
   * animes.
   * @param request Request
   * @param response Response
   * @returns JSON
   */
  async handle(request: Request, response: Response) {
    if (!request.params) {
      return response
        .status(400)
        .send({ error: "Não foi enviado o identificador do anime." });
    }

    const animeId = request.params.id;

    const isRemoved = await this.removeAnimeService.execute({ id: animeId });

    if (!isRemoved) {
      return response.status(400).send({
        message: "Não foi possível remover este anime! Tente novamente.",
      });
    }

    return response.status(200).send({
      message: "Anime removido com sucesso!",
    });
  }
}

export { RemoveAnimeController };
