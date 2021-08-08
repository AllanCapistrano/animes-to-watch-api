import { EntityRepository, Repository } from "typeorm";

import { IAnimesRepositories } from "../repositories/interfaces/IAnimesRepositories";
import { Anime } from "../entities/Anime";

@EntityRepository(Anime)
class AnimesRepositories
  extends Repository<Anime>
  implements IAnimesRepositories
{
  /**
   * Procura um anime pelo nome.
   * @param name string
   * @returns Promise<Anime>
   */
  async findByName(name: string): Promise<Anime> {
    return await this.findOne({ name });
  }

  /**
   * Cria um anime e salva no Banco de Dados.
   * @param name string
   * @param image string | null
   * @param url string
   * @param description string | null
   * @returns Promise<Anime>
   */
  async createAndSave(
    name: string,
    image: string | null,
    url: string,
    description: string | null
  ): Promise<Anime> {
    const anime = this.create({
      name,
      image,
      url,
      description,
    });

    await this.save(anime);

    return anime;
  }

  /**
   * Verifica se o anime existe no Banco de Dados.
   * @param id string | null
   * @param name string
   * @returns Promise<Anime | false>
   */
  async animeExists(id: string | null, name?: string): Promise<Anime | false> {
    if (id) {
      return await this.findOne(id);
    }

    if (name) {
      return await this.findByName(name);
    }

    return false;
  }
}

export { AnimesRepositories };
