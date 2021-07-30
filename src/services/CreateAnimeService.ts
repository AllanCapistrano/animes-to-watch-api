import { getCustomRepository } from "typeorm";

import { AnimesRepositories } from "../repositories/AnimesRepositories";
import { AnimesCategoriesRepositories } from "../repositories/AnimesCategoriesRepositories";

interface IAnime {
  name: string;
  image: string;
  url: string;
  description?: string;
  categories: string[];
}

class CreateAnimeService {
  /**
   * Cria um anime e seus relacionamentos no Banco de Daos.
   * @param anime Anime
   * @returns JSON
   */
  async execute({ name, image, url, description = null, categories }: IAnime) {
    const animesRepositories = getCustomRepository(AnimesRepositories);

    const animeAlreadyExists = await animesRepositories.findOne({ name });

    if (animeAlreadyExists) {
      throw new Error("Anime já cadastrado! Tente novamente.");
    }

    const animesCategoriesRepositories = getCustomRepository(
      AnimesCategoriesRepositories
    );

    const anime = animesRepositories.create({
      name,
      image,
      url,
      description,
    });

    await animesRepositories.save(anime);

    /**
     * Criando os relacionanmentos do anime cadastrado.
     */
    await animesCategoriesRepositories.createAndSaveMultiplesEntities(
      categories,
      anime.id
    );

    return anime;
  }
}

export { CreateAnimeService };
