import { ICategoriesRepositories } from "../repositories/interfaces/ICategoriesRepositories";

interface ICategory {
  id: string | null;
  name?: string;
}

class RemoveCategoryService {
  /**
   * Método Construtor.
   * @param categoryRepository ICategoriesRepositories
   */
  constructor(private categoryRepository: ICategoriesRepositories) {}

  /**
   * Remove uma categoria.
   * @param category Category
   * @returns boolean
   */
  async execute({ id, name = null }: ICategory) {
    if (id) {
      const categoryExists = await this.categoryRepository.categoryExists(id);

      if (!categoryExists) {
        throw new Error("Categoria inválida! Tente novamente.");
      }

      return await this.categoryRepository.removeCategory(categoryExists);
    }

    if (name) {
      const categoryExists = await this.categoryRepository.categoryExists(
        null,
        name
      );

      if (!categoryExists) {
        throw new Error("Categoria inválida! Tente novamente.");
      }

      return await this.categoryRepository.removeCategory(categoryExists);
    }

    return false;
  }
}

export { RemoveCategoryService };
