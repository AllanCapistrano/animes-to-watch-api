import { EntityRepository, Repository } from "typeorm";

import { AnimeCategory } from "../entities/AnimeCategory";

@EntityRepository(AnimeCategory)
class AnimesCategoriesRepositories extends Repository<AnimeCategory> {
  /**
   * Cria e salva uma entidade da tabela pivô animes_categories no Banco de
   * Dados.
   * @param categories string[]
   * @param animeId string
   */
  async createAndSaveMultiplesEntities(categories: string[], animeId: string) {
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
