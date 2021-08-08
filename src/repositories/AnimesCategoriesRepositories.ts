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

  /**
   * Retorna os IDs das categorias relacionadas com o anime passado.
   * @param animeId string
   * @returns Promise<string[]>
   */
  async categoriesIds(animeId: string): Promise<string[]> {
    const animesCategories = await this.find({ animeId });
    let categoriesIds: string[] = [];

    animesCategories.forEach((animeCategory) => {
      categoriesIds.push(animeCategory.categoryId);
    });

    return categoriesIds;
  }
}

export { AnimesCategoriesRepositories };
