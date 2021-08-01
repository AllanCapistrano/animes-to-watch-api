import { User } from "../../entities/User";

interface IUsersRepositories {
  /**
   * Procura um usuário cadastrado pelo email.
   * @param email string
   * @returns Promise<User>
   */
  findByEmail(email: string): Promise<User>;

  /**
   * Cria um usuário e salva-o.
   * @param name string
   * @param email string
   * @param password string
   * @param avatar string | null
   * @returns Promise<User>
   */
  createAndSave(
    name: string,
    email: string,
    password: string,
    avatar: string | null
  ): Promise<User>;
}

export { IUsersRepositories };
