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

    /**
     * A função classToPlain() permite a execução dos campos da entidade que são
     * especificados por uma tag da biblioteca class-transformer.
     */
    return classToPlain(categories);
  }
}

export { ListCategoriesService };
