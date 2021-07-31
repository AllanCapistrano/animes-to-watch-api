import { hash } from "bcryptjs";
import { validate } from "email-validator";

import { IUsersRepositories } from "../repositories/interfaces/IUsersRepositories";

interface IUser {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

class CreateUserService {
  /**
   * Método construtor.
   * @param userRepository IUsersRepositories
   */
  constructor(private userRepository: IUsersRepositories) {}

  /**
   * Cria um novo usuário no Banco de Dados.
   * @param user User
   * @returns User
   */
  async execute({ name, email, password, avatar = null }: IUser) {
    /**
     * Validando o email.
     */
    if (!validate(email)) {
      throw new Error("Email inválido! Tente novamente.");
    }

    const userAlreadyExists = await this.userRepository.findByEmail(email);

    /**
     * Verifica se o usuário já está cadastrado (email é único).
     */
    if (userAlreadyExists) {
      throw new Error("Usuário já cadastrado!");
    }

    const passwordHash = await hash(password, 8);

    const user = this.userRepository.createAndSave(
      name,
      email,
      passwordHash,
      avatar
    );

    return user;
  }
}

export { CreateUserService };
