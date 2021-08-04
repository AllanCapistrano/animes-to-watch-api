import { getCustomRepository } from "typeorm";

import { UsersRepositories } from "../../repositories/UsersRepositories";
import { UpdateUserService } from "../../services/UpdateUserService";
import { UpdateUserController } from "../../controllers/UpdateUserController";

export const updateUserFactory = () => {
  const userRepository = getCustomRepository(UsersRepositories);
  const updateUserService = new UpdateUserService(userRepository);
  const updateUserController = new UpdateUserController(updateUserService);

  return updateUserController;
};
