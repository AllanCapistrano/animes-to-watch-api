import { validate } from "email-validator";
import { hash } from "bcryptjs";

import { IUsersRepositories } from "../repositories/interfaces/IUsersRepositories";

interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

class UpdateUserService {
  /**
   * Método construtor.
   * @param userRepository IUsersRepositories
   */
  constructor(private userRepository: IUsersRepositories) {}

  /**
   * Atualizar as informações do usuário.
   * @param user User
   * @returns User
   */
  async execute({ id, name, email, password, avatar = null }: IUser) {
    const user = await this.userRepository.userExists(id);

    if (!user) {
      throw new Error("Usuário não encontrado! Tente novamente.");
    }

    if (!validate(email)) {
      throw new Error("Email inválido! Tente novamente.");
    }

    const passwordHash = await hash(password, 8);

    user.name = name;
    user.email = email;
    user.password = passwordHash;
    user.avatar = avatar;

    const userUpdated = await this.userRepository.updateUser(user);

    return userUpdated;
  }
}

export { UpdateUserService };
