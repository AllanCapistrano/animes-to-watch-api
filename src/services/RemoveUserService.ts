import { IUsersRepositories } from "../repositories/interfaces/IUsersRepositories";

interface IUser {
  id: string | null;
  email?: string;
}

class RemoveUserService {
  /**
   * Método construtor.
   * @param userRepository IUserRepositories
   */
  constructor(private userRepository: IUsersRepositories) {}

  /**
   * Remove um usuário.
   * @param user User
   * @returns Promise<boolean>
   */
  async execute({ id, email = null }: IUser) {
    if (id) {
      const userExists = await this.userRepository.userExists(id);

      if (!userExists) {
        throw new Error("Usuário inválido! Tente novamente.");
      }

      return await this.userRepository.removeUser(userExists);
    }

    if (email) {
      const userExists = await this.userRepository.userExists(null, email);

      if (!userExists) {
        throw new Error("Usuário inválido! Tente novamente.");
      }

      return await this.userRepository.removeUser(userExists);
    }

    return false;
  }
}

export { RemoveUserService };
