import { EntityRepository, Repository } from "typeorm";

import { User } from "../entities/User";

@EntityRepository(User)
class UsersRepositories extends Repository<User> {
  /**
   * Procura um usuário cadastrado pelo email.
   * @param email string 
   * @returns JSON
   */
  async findByEmail(email: string) {
    /**
     * Colocando o email em caixa baixa.
     */
    const emailLowerCase = email.toLowerCase();

    return await this.findOne({ email: emailLowerCase });
  }

  /**
   * Cria um novo usuário e salva no Banco de Dados.
   * @param user User
   * @returns JSON
   */
  async createAndSave(name: string, email: string, password: string, avatar: string) {
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
