import { Anime } from "../../entities/Anime";

interface IAnimesRepositories {
  /**
   * Procura um anime pelo nome.
   * @param name string
   * @returns Promise<Anime>
   */
  findByName(name: string): Promise<Anime>;

  /**
   * Cria um anime e salva-o.
   * @param name string
   * @param image string
   * @param url string
   * @param description string | null
   * @returns Promise<Anime>
   */
  createAndSave(
    name: string,
    image: string | null,
    url: string,
    description: string | null
  ): Promise<Anime>;

  /**
   * Verifica se o anime está cadastrado.
   * @param id string | null
   * @param name string
   * @returns Promise<Anime | false>
   */
  animeExists(id: string | null, name?: string): Promise<Anime | false>;

  /**
   * Atualiza as informações de um anime.
   * @param anime Anime
   * @return Promise<Anime>
   */
  updateAnime(anime: Anime): Promise<Anime>;
}

export { IAnimesRepositories };
