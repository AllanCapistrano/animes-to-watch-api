import { getCustomRepository } from "typeorm";

import { AnimesCategoriesRepositories } from "../../repositories/AnimesCategoriesRepositories";
import { AnimesRepositories } from "../../repositories/AnimesRepositories";
import { CategoriesRepositories } from "../../repositories/CategoriesRepositories";
import { UpdateAnimeService } from "../../services/UpdateAnimeService";
import { UpdateAnimeController } from "../../controllers/UpdateAnimeController";

export const updateAnimeFactory = () => {
  const animeRepository = getCustomRepository(AnimesRepositories);
  const categoryRepository = getCustomRepository(CategoriesRepositories);
  const animeCategoryRepository = getCustomRepository(
    AnimesCategoriesRepositories
  );

  const updateAnimeService = new UpdateAnimeService(
    animeRepository,
    categoryRepository,
    animeCategoryRepository
  );

  const updateAnimeController = new UpdateAnimeController(updateAnimeService);

  return updateAnimeController;
};
