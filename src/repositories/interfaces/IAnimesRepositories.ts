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
}

export { IAnimesRepositories };
