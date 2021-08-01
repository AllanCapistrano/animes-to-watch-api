import { Category } from "../../entities/Category";

interface ICategoriesRepositories {
  /**
   * Procura uma categoria pelo nome.
   * @param name string
   * @returns Promise<Category>
   */
  findByName(name: string): Promise<Category>;

  /**
   * Cria uma categoria com a primeira letra de cada palavra em
   * caixa alta, e salva-a.
   * @param name string
   * @returns Promise<Category>
   */
  createAndSave(name: string): Promise<Category>;

  /**
   * Retorna todas as categorias cujos IDs foram passados.
   * @param categories string[]
   * @returns Promise<Category[]>
   */
  findMultiples(categories: string[]): Promise<Category[]>;
}

export { ICategoriesRepositories };
