import { getCustomRepository } from "typeorm";

import { UsersRepositories } from "../../repositories/UsersRepositories";
import { AuthenticateUserService } from "../../services/AuthenticateUserService";
import { AuthenticateUserController } from "../../controllers/AuthenticateUserController";

export const authenticateUserFactory = () => {
  const userRepository = getCustomRepository(UsersRepositories);
  const authenticateUserService = new AuthenticateUserService(userRepository);
  const authenticateUserController = new AuthenticateUserController(
    authenticateUserService
  );

  return authenticateUserController;
};
