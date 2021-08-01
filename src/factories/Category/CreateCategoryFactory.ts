import { getCustomRepository } from "typeorm";

import { CategoriesRepositories } from "../../repositories/CategoriesRepositories";
import { CreateCategoryService } from "../../services/CreateCategoryService";
import { CreateCategoryController } from "../../controllers/CreateCategoryController";

export const createCategoryFactory = () => {
  const categoryRepository = getCustomRepository(CategoriesRepositories);
  const createCategoryService = new CreateCategoryService(categoryRepository);
  const createCategoryController = new CreateCategoryController(createCategoryService);

  return createCategoryController;
};