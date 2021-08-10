import { getCustomRepository } from "typeorm"

import { CategoriesRepositories } from "../../repositories/CategoriesRepositories";
import { UpdateCategoryService } from "../../services/UpdateCategoryService";
import { UpdateCategoryController } from "../../controllers/UpdateCategoryController";

export const updateCategoryFactory = () => {
  const categoryRepository = getCustomRepository(CategoriesRepositories);
  const updateCategoryService = new UpdateCategoryService(categoryRepository);
  const updateCategoryController = new UpdateCategoryController(updateCategoryService);

  return updateCategoryController;
}