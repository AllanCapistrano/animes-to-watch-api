import { getCustomRepository } from "typeorm";

import { UsersRepositories } from "../../repositories/UsersRepositories";
import { RemoveUserService } from "../../services/RemoveUserService";
import { RemoveUserController } from "../../controllers/RemoveUserController";

export const removeUserFactory = () => {
  const userRepository = getCustomRepository(UsersRepositories);
  const removeUserService = new RemoveUserService(userRepository);
  const removeUserController = new RemoveUserController(removeUserService);

  return removeUserController;
};
