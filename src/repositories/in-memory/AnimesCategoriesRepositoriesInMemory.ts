import { IAnimesCategoriesRepositories } from "../interfaces/IAnimesCategoriesRepositories";
import { AnimeCategory } from "../../entities/AnimeCategory";

class AnimesCategoriesRepositoriesInMemory
  implements IAnimesCategoriesRepositories
{
  private animesCategories: AnimeCategory[] = [];

  /**
   * Cria e salva uma entidade que se relaciona com Anime e Category.
   * @param categories string[]
   * @param animeId string
   */
  async createAndSave(categories: string[], animeId: string): Promise<void> {
    let animeCategory: AnimeCategory = new AnimeCategory();

    categories.forEach((category) => {
      animeCategory.animeId = animeId;
      animeCategory.categoryId = category;

      this.animesCategories.push(animeCategory);
    });
  }

  /**
   * Retornar os IDs das categorias que estão realacionadas com o anime passado.
   * @param animeId string
   * @returns Promise<string[]>
   */
  async categoriesIds(animeId: string): Promise<string[]> {
    let categoriesIds: string[] = [];

    this.animesCategories.forEach((animeCategory) => {
      if (animeCategory.animeId === animeId)
        categoriesIds.push(animeCategory.categoryId);
    });

    return categoriesIds;
  }
}

export { AnimesCategoriesRepositoriesInMemory };
