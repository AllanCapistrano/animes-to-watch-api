import { getCustomRepository } from "typeorm";

import { CategoriesRepositories } from "../../repositories/CategoriesRepositories";
import { RemoveCategoryService } from "../../services/RemoveCategoryService";
import { RemoveCategoryController } from "../../controllers/RemoveCategoryController";

export const removeCategoryFactory = () => {
  const categoryRepository = getCustomRepository(CategoriesRepositories);
  const removeCategoryService = new RemoveCategoryService(categoryRepository);
  const removeCategoryController = new RemoveCategoryController(removeCategoryService);

  return removeCategoryController;
};