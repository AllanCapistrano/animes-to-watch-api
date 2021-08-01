import { getCustomRepository } from "typeorm";

import { AnimesRepositories } from "../../repositories/AnimesRepositories";
import { CategoriesRepositories } from "../../repositories/CategoriesRepositories";
import { AnimesCategoriesRepositories } from "../../repositories/AnimesCategoriesRepositories";
import { CreateAnimeService } from "../../services/CreateAnimeService";
import { CreateAnimeController } from "../../controllers/CreateAnimeController";

export const createAnimeFactory = () => {
  const animeRepository = getCustomRepository(AnimesRepositories);
  const categoryRepository = getCustomRepository(CategoriesRepositories);

  const animeCategoryRepository = getCustomRepository(
    AnimesCategoriesRepositories
  );

  const createAnimeService = new CreateAnimeService(
    animeRepository,
    categoryRepository,
    animeCategoryRepository
  );

  const createAnimeController = new CreateAnimeController(createAnimeService);

  return createAnimeController;
};
