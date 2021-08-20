import { classToPlain } from "class-transformer";

import { ICategoriesRepositories } from "../repositories/interfaces/ICategoriesRepositories";

class ListCategoriesService {
  /**
   * Método construtor.
   * @param categoryRepository ICategoriesRepositories
   */
  constructor(private categoryRepository: ICategoriesRepositories) {}

  /**
   * Retorna as categorias cadastradas.
   * @returns Promise<Category[]>
   */
  async execute() {
    const categories = this.categoryRepository.listCategories();

    return classToPlain(categories);
  }
}

export { ListCategoriesService };
