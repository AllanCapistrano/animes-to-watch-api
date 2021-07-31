interface IAnimesCategoriesRepositories {
  /**
   * Cria e salva uma entidade que se relaciona com Anime e Category.
   * @param categories string[]
   * @param animeId string
   */
  createAndSave(categories: string[], animeId: string): Promise<void>;
}

export { IAnimesCategoriesRepositories };
