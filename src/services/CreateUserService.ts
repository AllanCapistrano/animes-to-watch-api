import { getCustomRepository } from "typeorm";
import { hash } from "bcryptjs";
import { validate } from "email-validator";

import { UsersRepositories } from "../repositories/UsersRepositories";

interface IUser {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

class CreateUserService {
  /**
   * Cria um novo usuário no Banco de Dados.
   * @param user User
   * @returns User
   */
  async execute({ name, email, password, avatar = null }: IUser) {
    const userRepository = getCustomRepository(UsersRepositories);

    /**
     * Validando o email.
     */
    if (!validate(email)) {
      throw new Error("Email inválido! Tente novamente.");
    }

    const userAlreadyExists = await userRepository.findByEmail(email);

    /**
     * Verifica se o usuário já está cadastrado (email é único).
     */
    if (userAlreadyExists) {
      throw new Error("Usuário já cadastrado!");
    }

    const passwordHash = await hash(password, 8);

    const user = userRepository.createAndSave(
      name,
      email,
      passwordHash,
      avatar
    );

    return user;
  }
}

export { CreateUserService };
