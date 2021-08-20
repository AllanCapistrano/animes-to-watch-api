import { getCustomRepository } from "typeorm";

import { CategoriesRepositories } from "../../repositories/CategoriesRepositories";
import { ListCategoriesService } from "../../services/ListCategoriesService";
import { ListCategoriesController } from "../../controllers/ListCategoriesController";

export const listCategoriesFactory = () => {
  const categoryRepository = getCustomRepository(CategoriesRepositories);
  const listCategoriesService = new ListCategoriesService(categoryRepository);
  const listCategoriesController = new ListCategoriesController(
    listCategoriesService
  );

  return listCategoriesController;
};
