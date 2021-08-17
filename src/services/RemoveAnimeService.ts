import { IAnimesRepositories } from "../repositories/interfaces/IAnimesRepositories";

interface IAnime {
  id: string;
  name?: string;
}

class RemoveAnimeService {
  /**
   * Método construtor.
   * @param animeRepository IAnimesRepositories
   */
  constructor(private animeRepository: IAnimesRepositories) {}

  /**
   * Remove um anime.
   * @param anime Anime
   * @returns Promise<boolean>
   */
  async execute({ id, name = null }: IAnime) {
    if (id) {
      const animeExists = await this.animeRepository.animeExists(id);

      if (!animeExists) {
        throw new Error("Anime inválido! Tente novamente.");
      }

      return !!(await this.animeRepository.removeAnime(animeExists));
    }

    if (name) {
      const animeExists = await this.animeRepository.animeExists(null, name);

      if (!animeExists) {
        throw new Error("Anime inválido! Tente novamente.");
      }

      return !!(await this.animeRepository.removeAnime(animeExists));
    }

    return false;
  }
}

export { RemoveAnimeService };
