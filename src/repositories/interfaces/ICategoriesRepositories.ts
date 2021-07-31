import { Category } from "../../entities/Category";

interface ICategoriesRepositories {
  /**
   * Procura uma categoria pelo nome.
   * @param name string
   * @returns Category
   */
  findByName(name: string): Promise<Category>;

  /**
   * Cria uma categoria com a primeira letra de cada palavra em
   * caixa alta, e salva-a.
   * @param name string
   * @returns Category
   */
  createAndSave(name: string): Promise<Category>;
}

export { ICategoriesRepositories };
