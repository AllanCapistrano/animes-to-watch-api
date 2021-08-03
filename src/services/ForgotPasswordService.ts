import { validate } from "email-validator";
import { hash } from "bcryptjs";

import { IUsersRepositories } from "../repositories/interfaces/IUsersRepositories";

interface IUser {
  email: string;
  newPassword: string;
}

class ForgotPasswordService {
  /**
   * Método construtor.
   * @param userRepository IUsersRepositories
   */
  constructor(private userRepository: IUsersRepositories) {}

  /**
   * Altera a senha do usuário no Bando de Dados.
   * @param user User
   * @returns Promise<boolean>
   */
  async execute({ email, newPassword }: IUser) {
    if (!validate(email)) {
      throw new Error("Email inválido! Tente novamente.");
    }

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("Usuário não encontrado! Verifique o email digitado.");
    }

    const passwordHash = await hash(newPassword, 8);

    const isPasswordUpdated = await this.userRepository.changePassword(
      user,
      passwordHash
    );

    return isPasswordUpdated;
  }
}

export { ForgotPasswordService };
