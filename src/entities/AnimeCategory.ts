import { Entity, PrimaryColumn, JoinColumn, ManyToOne } from "typeorm";

import { Anime } from "./Anime";
import { Category } from "./Category";

@Entity("animes_categories")
class AnimeCategory {
  @PrimaryColumn()
  animeId: string;

  @PrimaryColumn()
  categoryId: string;

  /**
   * Relacionamento Many To Many com Anime.
   */
  @ManyToOne(() => Anime, (anime) => anime.categoryConnection, {
    primary: true,
  })
  @JoinColumn({ name: "animeId" })
  anime: Promise<Anime>;

  /**
   * Relacionamento Many To Many com Category.
   */
  @ManyToOne(() => Category, (category) => category.animeConnection, {
    primary: true,
  })
  @JoinColumn({ name: "categoryId" })
  category: Promise<Category>;
}

export { AnimeCategory };
