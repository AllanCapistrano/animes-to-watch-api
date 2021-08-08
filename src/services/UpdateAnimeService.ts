import { AnimesRepositories } from "../repositories/AnimesRepositories";
import { CategoriesRepositories } from "../repositories/CategoriesRepositories";
import { AnimesCategoriesRepositories } from "../repositories/AnimesCategoriesRepositories";
import { hasDifferentCategories } from "../providers/HasDifferentCategories";

interface IAnime {
  id: string;
  name: string;
  image?: string;
  url: string;
  description?: string;
  categories: string[];
}

class UpdateAnimeService {
  /**
   * Método construtor.
   * @param animesRepositories AnimeRepositories
   * @param categoriesRepositories CategoriesRepositories
   * @param animesCategoriesRepositories AnimesCategoriesRepositories
   */
  constructor(
    private animesRepositories: AnimesRepositories,
    private categoriesRepositories: CategoriesRepositories,
    private animesCategoriesRepositories: AnimesCategoriesRepositories
  ) {}

  /**
   * Atualiza as informações do anime no Banco de Dados.
   * @param anime Anime
   * @returns Promise<Anime>
   */
  async execute({
    id,
    name,
    image = null,
    url,
    description = null,
    categories,
  }: IAnime) {
    const anime = await this.animesRepositories.animeExists(id);

    if (!anime) {
      throw new Error("Anime não encontrado! Tente novamente.");
    }

    const invalidAnimeName = await this.animesRepositories.findOne({ name });

    if (invalidAnimeName && invalidAnimeName.id !== id) {
      throw new Error(
        "Já existe um anime cadastrado com esse nome! Tente novamente."
      );
    }

    if (categories.length == 0) {
      throw new Error(
        "Para a atualização de um anime é necessário uma ou mais categorias."
      );
    }

    const categoriesInDB = await this.categoriesRepositories.findMultiples(
      categories
    );

    if (categories.length != categoriesInDB.length) {
      throw new Error("Categoria(s) inválida(s)! Tente novamente.");
    }

    anime.name = name;
    anime.image = image;
    anime.url = url;
    anime.description = description;

    const animeUpdated = await this.animesRepositories.save(anime);
    const categoriesIds = await this.animesCategoriesRepositories.categoriesIds(
      id
    );

    /**
     * Caso alguma categoria seja modificada.
     */
    if (hasDifferentCategories(categories, categoriesIds)) {
      await this.animesCategoriesRepositories.delete({ animeId: id });

      await this.animesCategoriesRepositories.createAndSave(categories, id);
    }

    return animeUpdated;
  }
}

export { UpdateAnimeService };
