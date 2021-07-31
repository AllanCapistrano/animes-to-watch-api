interface IAnimesCategoriesRepositories {
  /**
   * Cria e salva uma entidade da tabela pivô animes_categories no Banco de
   * Dados.
   * @param categories string[]
   * @param animeId string
   */
  createAndSave(categories: string[], animeId: string): Promise<void>;
}

export { IAnimesCategoriesRepositories };
