import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { v4 as uuid } from "uuid";

import { Category } from "./Category";
import { AnimeCategory } from "./AnimeCategory";

@Entity("animes")
class Anime {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column()
  url: string;

  @Column()
  description: string;

  /**
   * Relacionamento Many To Many com Category.
   */
  @OneToMany(() => AnimeCategory, (ac) => ac.anime)
  categoryConnection: Promise<Category[]>;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  /**
   * Caso seja um novo anime, é gerado um ID para o mesmo.
   */
  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Anime };
