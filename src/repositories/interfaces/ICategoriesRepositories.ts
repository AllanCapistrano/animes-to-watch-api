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

  /**
   * Verifica se a categoria já está cadastrada.
   * @param id string
   * @param name string
   * @returns Promise<Category | false>
   */
  categoryExists(id: string, name?: string): Promise<Category | false>;

  /**
   * Atualiza as informações de uma categoria.
   * @param category Category
   * @returns Promise<Category>
   */
  updateCategory(category: Category): Promise<Category>;

  /**
   * Remove uma categoria.
   * @param category Category
   * @returns Promise<boolean>
   */
  removeCategory(category: Category): Promise<boolean>;
}

export { ICategoriesRepositories };
