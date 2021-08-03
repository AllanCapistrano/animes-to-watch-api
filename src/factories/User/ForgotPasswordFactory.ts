import { getCustomRepository } from "typeorm";

import { UsersRepositories } from "../../repositories/UsersRepositories";
import { ForgotPasswordService } from "../../services/ForgotPasswordService";
import { ForgotPasswordController } from "../../controllers/ForgotPasswordController";

export const forgotPasswordFactory = () => {
  const userRepository = getCustomRepository(UsersRepositories);
  const forgotPasswordService = new ForgotPasswordService(userRepository);
  const forgotPasswordController = new ForgotPasswordController(
    forgotPasswordService
  );

  return forgotPasswordController;
};
