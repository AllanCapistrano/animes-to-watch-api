import { User } from "../../entities/User";

interface IUsersRepositories {
  /**
   * Procura um usuário cadastrado pelo email.
   * @param email string
   * @returns User
   */
  findByEmail(email: string): Promise<User>;

  /**
   * Cria um usuário e salva no Banco de Dados.
   * @param name string
   * @param email string
   * @param password string
   * @param avatar string | null
   * @returns User
   */
  createAndSave(
    name: string,
    email: string,
    password: string,
    avatar: string | null
  ): Promise<User>;
}

export { IUsersRepositories };
