import { EntityRepository, Repository } from "typeorm";

import { IUsersRepositories } from "../repositories/interfaces/IUsersRepositories";
import { User } from "../entities/User";

@EntityRepository(User)
class UsersRepositories extends Repository<User> implements IUsersRepositories {
  /**
   * Procura um usuário cadastrado pelo email.
   * @param email string
   * @returns User
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
   * @returns User
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
}

export { UsersRepositories };
