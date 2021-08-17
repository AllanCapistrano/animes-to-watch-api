import { EntityRepository, Repository } from "typeorm";

import { ICategoriesRepositories } from "../repositories/interfaces/ICategoriesRepositories";
import { Category } from "../entities/Category";

@EntityRepository(Category)
class CategoriesRepositories
  extends Repository<Category>
  implements ICategoriesRepositories
{
  /**
   * Procura uma categoria pelo nome.
   * @param name string
   * @returns Promise<Category>
   */
  async findByName(name: string): Promise<Category> {
    const nameSplited = name.toLowerCase().split(" ");

    /**
     * Colocando a primeira letra em caixa alta.
     */
    const nameFirstLetrterUpperCase = nameSplited.map((temp: string) => {
      return temp.charAt(0).toUpperCase() + temp.slice(1);
    });

    return await this.findOne({ name: nameFirstLetrterUpperCase.join(" ") });
  }

  /**
   * Cria uma categoria com a primeira letra de cada palavra em
   * caixa alta, e salva no Banco de Dados.
   * @param name string
   * @returns Promise<Category>
   */
  async createAndSave(name: string): Promise<Category> {
    const nameSplited = name.toLowerCase().split(" ");

    /**
     * Colocando a primeira letra em caixa alta.
     */
    const nameFirstLetrterUpperCase = nameSplited.map((temp: string) => {
      return temp.charAt(0).toUpperCase() + temp.slice(1);
    });

    return this.save(
      await this.create({ name: nameFirstLetrterUpperCase.join(" ") })
    );
  }

  /**
   * Retorna todas as categorias cujos IDs foram passados.
   * @param categories string[]
   * @returns Promise<Category[]>
   */
  async findMultiples(categories: string[]): Promise<Category[]> {
    return await this.findByIds(categories);
  }

  /**
   * Verifica se a categoria já está cadastrada no Banco de Dados.
   * @param id string | null
   * @param name string
   * @returns Promise<Category | false>
   */
  async categoryExists(id: string, name?: string): Promise<Category | false> {
    if (id) {
      return await this.findOne(id);
    }

    if (name) {
      return await this.findByName(name);
    }

    return false;
  }

  /**
   * Atualiza as informações de uma categoria no Banco de Dados.
   * @param category Category
   * @returns Promise<Category>
   */
  async updateCategory(category: Category): Promise<Category> {
    const nameSplited = category.name.toLowerCase().split(" ");

    /**
     * Colocando a primeira letra em caixa alta.
     */
    const nameFirstLetrterUpperCase = nameSplited.map((temp: string) => {
      return temp.charAt(0).toUpperCase() + temp.slice(1);
    });

    return await this.save({
      ...category,
      name: nameFirstLetrterUpperCase.join(" "),
    });
  }

  /**
   * Remove uma categoria do Banco de Dados.
   * @param category Category
   * @returns Promise<boolean>
   */
  async removeCategory(category: Category): Promise<boolean> {
    return !!(await this.remove(category));
  }
}

export { CategoriesRepositories };
