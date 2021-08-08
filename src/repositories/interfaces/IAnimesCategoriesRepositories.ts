interface IAnimesCategoriesRepositories {
  /**
   * Cria e salva uma entidade que se relaciona com Anime e Category.
   * @param categories string[]
   * @param animeId string
   */
  createAndSave(categories: string[], animeId: string): Promise<void>;

  /**
   * Retorna os IDs das categorias relacionadas com o anime passado.
   * @param animeId string
   * @returns Promise<string[]>
   */
  categoriesIds(animeId: string): Promise<string[]>;
}

export { IAnimesCategoriesRepositories };
