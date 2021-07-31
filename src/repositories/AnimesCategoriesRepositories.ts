import { EntityRepository, Repository } from "typeorm";

import { IAnimesCategoriesRepositories } from "../repositories/interfaces/IAnimesCategoriesRepositories";
import { AnimeCategory } from "../entities/AnimeCategory";

@EntityRepository(AnimeCategory)
class AnimesCategoriesRepositories
  extends Repository<AnimeCategory>
  implements IAnimesCategoriesRepositories
{
  /**
   * Cria e salva uma entidade da tabela pivô animes_categories no Banco de
   * Dados.
   * @param categories string[]
   * @param animeId string
   */
  async createAndSave(categories: string[], animeId: string): Promise<void> {
    const animesCategories = [];

    categories.forEach((category) => {
      animesCategories.push(
        this.create({
          animeId,
          categoryId: category,
        })
      );
    });

    animesCategories.forEach(async (animeCategory) => {
      await this.save(animeCategory);
    });
  }
}

export { AnimesCategoriesRepositories };
