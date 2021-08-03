import { EntityRepository, Repository } from "typeorm";

import { IUsersRepositories } from "../repositories/interfaces/IUsersRepositories";
import { User } from "../entities/User";

@EntityRepository(User)
class UsersRepositories extends Repository<User> implements IUsersRepositories {
  /**
   * Procura um usuário cadastrado pelo email.
   * @param email string
   * @returns Promise<User>
   */
  async findByEmail(email: string): Promise<User> {
    /**
     * Colocando o email em caixa baixa.
     */
    const emailLowerCase = email.toLowerCase();

    return await this.findOne({ email: emailLowerCase });
  }

  /**
   * Cria um usuário e salva no Banco de Dados.
   * @param name string
   * @param email string
   * @param password string
   * @param avatar string
   * @returns Promise<User>
   */
  async createAndSave(
    name: string,
    email: string,
    password: string,
    avatar: string | null
  ): Promise<User> {
    /**
     * Colocando o email em caixa baixa.
     */
    const emailLowerCase = email.toLowerCase();

    const user = this.create({ name, email: emailLowerCase, password, avatar });

    await this.save(user);

    return user;
  }

  /**
   * Altera a senha do usuário no Banco de Dados.
   * @param user User
   * @param password string
   * @returns Promise<boolean>
   */
  async changePassword(user: User, password: string): Promise<boolean> {
    const userUpdated = await this.save({
      ...user,
      password,
    });

    /**
     * Forçar o retorno ser do tipo boolean.
     */
    return !!userUpdated;
  }
}

export { UsersRepositories };
