import { getCustomRepository } from "typeorm";

import { AnimesRepositories } from "../repositories/AnimesRepositories";
import { AnimesCategoriesRepositories } from "../repositories/AnimesCategoriesRepositories";
import { CategoriesRepositories } from "../repositories/CategoriesRepositories";

interface IAnime {
  name: string;
  image?: string;
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
  async execute({
    name,
    image = null,
    url,
    description = null,
    categories,
  }: IAnime) {
    const animesRepositories = getCustomRepository(AnimesRepositories);

    const animeAlreadyExists = await animesRepositories.findOne({ name });

    if (animeAlreadyExists) {
      throw new Error("Anime já cadastrado! Tente novamente.");
    }

    if (categories.length == 0) {
      throw new Error(
        "Para o cadastro de um anime é necessário uma ou mais categorias."
      );
    }

    const categoriesRepositories = getCustomRepository(CategoriesRepositories);

    /**
     * Procurando no Banco de Dados a(s) categoria(s) enviada(s) na requisição,
     * para realizar a validação.
     */
    const categoriesInDB =  await categoriesRepositories.findByIds(categories)

    if(categories.length != categoriesInDB.length) {
      throw new Error("Categoria(s) inválida(s)! Tente novamente.")
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
