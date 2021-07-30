import { EntityRepository, Repository } from "typeorm";

import { Anime } from "../entities/Anime";

@EntityRepository(Anime)
class AnimesRepositories extends Repository<Anime> {}

export { AnimesRepositories };
