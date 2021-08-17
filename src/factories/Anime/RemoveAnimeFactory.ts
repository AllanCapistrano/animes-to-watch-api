import { getCustomRepository } from "typeorm";

import { AnimesRepositories } from "../../repositories/AnimesRepositories";
import { RemoveAnimeService } from "../../services/RemoveAnimeService";
import { RemoveAnimeController } from "../../controllers/RemoveAnimeController";

export const removeAnimeFactory = () => {
  const animeRepository = getCustomRepository(AnimesRepositories);
  const removeAnimeService = new RemoveAnimeService(animeRepository);
  const removeAnimeController = new RemoveAnimeController(removeAnimeService);

  return removeAnimeController;
};
