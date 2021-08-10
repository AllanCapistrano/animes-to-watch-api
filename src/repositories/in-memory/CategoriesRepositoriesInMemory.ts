import { ICategoriesRepositories } from "../interfaces/ICategoriesRepositories";
import { Category } from "../../entities/Category";

class CategoriesRepositoriesInMemory implements ICategoriesRepositories {
  private categories: Category[] = [];

  /**
   * Procura uma categoria pelo nome.
   * @param name string
   * @returns Promise<Category>
   */
  async findByName(name: string): Promise<Category> {
    let category: Category | null = null;

    for (let i = 0; i < this.categories.length; i++) {
      if (this.categories[i].name === name) {
        category = this.categories[i];

        break;
      }
    }

    return category;
  }

  /**
   * Cria uma categoria e salva no Array.
   * @param name string
   * @returns Promise<Category>
   */
  async createAndSave(name: string): Promise<Category> {
    let category: Category = new Category();

    category.name = name;

    this.categories.push(category);

    return category;
  }

  /**
   * Retorna todas as categorias cujos IDs foram passados.
   * @param categories string[]
   * @returns Promise<Category[]>
   */
  async findMultiples(categories: string[]): Promise<Category[]> {
    let categoriesInMemory: Category[] = [];

    for (let i = 0; i < this.categories.length; i++) {
      for (let j = 0; j < categories.length; j++) {
        if (this.categories[i].id === categories[j]) {
          categoriesInMemory.push(this.categories[i]);

          break;
        }
      }
    }

    return categoriesInMemory;
  }

  /**
   * Verifica se a categoria está cadastrada.
   * @param id string | null
   * @param name string
   * @returns Promise<Category | false>
   */
  async categoryExists(id: string, name?: string): Promise<false | Category> {
    if (id) {
      for (let i = 0; i < this.categories.length; i++) {
        if (this.categories[i].id === id) {
          return this.categories[i];
        }
      }
    }

    if (name) {
      for (let i = 0; i < this.categories.length; i++) {
        if (this.categories[i].name === name) {
          return this.categories[i];
        }
      }
    }

    return false;
  }

  /**
   * Atualiza as informações de uma categoria.
   * @param category Category
   * @returns Promise<Category>
   */
  async updateCategory(category: Category): Promise<Category> {
    for (let i = 0; i < this.categories.length; i++) {
      if (this.categories[i].id === category.id) {
        this.categories[i] = category;

        return this.categories[i];
      }
    }
  }
}

export { CategoriesRepositoriesInMemory };
