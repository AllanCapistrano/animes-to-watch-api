import { IAnimesRepositories } from "../repositories/interfaces/IAnimesRepositories";
import { IAnimesCategoriesRepositories } from "../repositories/interfaces/IAnimesCategoriesRepositories";
import { ICategoriesRepositories } from "../repositories/interfaces/ICategoriesRepositories";

interface IAnime {
  name: string;
  image?: string;
  url: string;
  description?: string;
  categories: string[];
}

class CreateAnimeService {
  /**
   * Método construtor.
   * @param animesRepositories IAnimesRepositories.
   * @param categoriesRepositories ICategoriesRepositories
   * @param animesCategoriesRepositories IAnimesCategoriesRepositories
   */
  constructor(
    private animesRepositories: IAnimesRepositories,
    private categoriesRepositories: ICategoriesRepositories,
    private animesCategoriesRepositories: IAnimesCategoriesRepositories
  ) {}

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
    const animeAlreadyExists = await this.animesRepositories.findByName(name);

    if (animeAlreadyExists) {
      throw new Error("Anime já cadastrado! Tente novamente.");
    }

    if (categories.length == 0) {
      throw new Error(
        "Para o cadastro de um anime é necessário uma ou mais categorias."
      );
    }

    /**
     * Procurando no Banco de Dados a(s) categoria(s) enviada(s) na requisição,
     * para realizar a validação.
     */
    const categoriesInDB = await this.categoriesRepositories.findMultiples(
      categories
    );

    if (categories.length != categoriesInDB.length) {
      throw new Error("Categoria(s) inválida(s)! Tente novamente.");
    }

    const anime = await this.animesRepositories.createAndSave(
      name,
      image,
      url,
      description
    );

    /**
     * Criando os relacionanmentos do anime cadastrado.
     */
    await this.animesCategoriesRepositories.createAndSave(categories, anime.id);

    return anime;
  }
}

export { CreateAnimeService };
