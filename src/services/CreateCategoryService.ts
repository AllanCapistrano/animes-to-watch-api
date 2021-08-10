import { ICategoriesRepositories } from "../repositories/interfaces/ICategoriesRepositories";

interface ICategory {
  name: string;
}

class CreateCategoryService {
  /**
   * Método Construtor.
   * @param categoriesRepositories ICategoriesRepositories
   */
  constructor(private categoriesRepositories: ICategoriesRepositories) {}

  /**
   * Cria uma nova categoria.
   * @param category Category
   * @returns Category
   */
  async execute({ name }: ICategory) {
    const categoryAlreadyExists =
      await this.categoriesRepositories.categoryExists(null, name);

    /**
     * Verifica se a categoria já existe no Banco de Dados.
     */
    if (categoryAlreadyExists) {
      throw new Error("Categoria já cadastrada.");
    }

    const category = this.categoriesRepositories.createAndSave(name);

    return category;
  }
}

export { CreateCategoryService };
