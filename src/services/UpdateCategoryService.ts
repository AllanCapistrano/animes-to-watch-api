import { ICategoriesRepositories } from "../repositories/interfaces/ICategoriesRepositories";

interface ICategory {
  id: string;
  name: string;
}

class UpdateCategoryService {
  /**
   * Método construtor.
   * @param categoryRepository ICategoriesRepositories
   */
  constructor(private categoryRepository: ICategoriesRepositories) {}

  /**
   * Aualiza as informações da categoria.
   * @param category Category
   * @returns Category
   */
  async execute({ id, name }: ICategory) {
    const category = await this.categoryRepository.categoryExists(id);

    if (!category) {
      throw new Error("Categoria não encontrada! Tente novamente.");
    }

    const invalidCategory = await this.categoryRepository.findByName(name);

    if (invalidCategory && invalidCategory.id !== id) {
      throw new Error(
        "Já existe uma categoria cadastrada com esse nome! Tente novamente."
      );
    }

    category.name = name;

    const categoryUpdated = this.categoryRepository.updateCategory(category);

    return categoryUpdated;
  }
}

export { UpdateCategoryService };
