import { getCustomRepository } from "typeorm";

import { CategoriesRepositories } from "../repositories/CategoriesRepositories";

interface ICategory {
  name: string;
}

class CreateCategoryService {
  /**
   * Cria uma nova categoria no Banco de Dados.
   * @param category Category
   * @returns Category
   */
  async execute({ name }: ICategory) {
    const categoriesRepositories = getCustomRepository(CategoriesRepositories);

    const categoryAlreadyExists = await categoriesRepositories.findByName(name);

    /**
     * Verifica se a categoria já existe no Banco de Dados.
     */
    if (categoryAlreadyExists) {
      throw new Error("Categoria já cadastrada.");
    }

    const category = categoriesRepositories.createAndSave(name);

    return category;
  }
}

export { CreateCategoryService };
