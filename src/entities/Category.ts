import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { v4 as uuid } from "uuid";

import { Anime } from "./Anime";
import { AnimeCategory } from "./AnimeCategory";

@Entity("categories")
class Category {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  /**
   * Relacionamento Many To Many com Anime
   */
  @OneToMany(() => AnimeCategory, ac => ac.category)
  animeConnection: Promise<Anime[]>

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  /**
   * Caso seja uma nova categoria, é gerado um ID para a mesma.
   */
  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Category };
