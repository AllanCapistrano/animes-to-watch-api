import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { v4 as uuid } from "uuid";

import { Category } from "./Category";

@Entity()
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

  @ManyToMany(() => Category)
  @JoinTable()
  Category: Category[];

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
