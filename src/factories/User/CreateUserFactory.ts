import { getCustomRepository } from "typeorm";

import { UsersRepositories } from "../../repositories/UsersRepositories";
import { CreateUserService } from "../../services/CreateUserService";
import { CreateUserController } from "../../controllers/CreateUserController";

export const createUserFactory = () => {
  const userRepository = getCustomRepository(UsersRepositories);
  const createUserService = new CreateUserService(userRepository);
  const createUserController = new CreateUserController(createUserService);

  return createUserController;
};
