import { IAnimesRepositories } from "../interfaces/IAnimesRepositories";
import { Anime } from "../../entities/Anime";

class AnimesRepositoriesInMemory implements IAnimesRepositories {
  private animes: Anime[] = [];

  /**
   * Procura um anime pelo nome.
   * @param name string
   * @returns Promise<Anime>
   */
  async findByName(name: string): Promise<Anime> {
    let anime: Anime | null = null;

    for (let i = 0; i < this.animes.length; i++) {
      if (this.animes[i].name === name) {
        anime = this.animes[i];

        break;
      }
    }

    return anime;
  }

  /**
   * Cria um anime e salva-o no Array.
   * @param name string
   * @param image string
   * @param url string
   * @param description string | null
   * @returns Promise<Anime>
   */
  async createAndSave(
    name: string,
    image: string,
    url: string,
    description: string
  ): Promise<Anime> {
    let anime: Anime = new Anime();

    anime.name = name;
    anime.image = image;
    anime.url = url;
    anime.description = description;

    this.animes.push(anime);

    return anime;
  }

  /**
   * Verifica se o anime já está cadastrado.
   * @param id string | null
   * @param name string
   * @returns Promise<false | Anime>
   */
  async animeExists(id: string, name?: string): Promise<false | Anime> {
    // let anime: Anime | boolean = false;

    if (id) {
      for (let i = 0; i < this.animes.length; i++) {
        if (this.animes[i].id === id) {
          return this.animes[i];
        }
      }
    }

    if (name) {
      for (let i = 0; i < this.animes.length; i++) {
        if (this.animes[i].name === name) {
          return this.animes[i];
        }
      }
    }

    return false;
  }

  /**
   * Atualiza as informações de um anime.
   * @param anime Anime
   * @returns Promise<Anime>
   */
  async updateAnime(anime: Anime): Promise<Anime> {
    for (let i = 0; i < this.animes.length; i++) {
      if (this.animes[i].id === anime.id) {
        this.animes[i] = anime;

        return this.animes[i];
      }
    }
  }

  /**
   * Remove um anime.
   * @param anime Anime
   * @returns Promise<boolean>
   */
  async removeAnime(anime: Anime): Promise<boolean> {
    for (let i = 0; i < this.animes.length; i++) {
      if (this.animes[i].id === anime.id) {
        return !!this.animes.splice(i, 1);
      }
    }
  }
}

export { AnimesRepositoriesInMemory };
