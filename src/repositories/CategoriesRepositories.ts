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
   * @returns Category
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
   * @returns Category
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
}

export { CategoriesRepositories };
