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

  /**
   * Altera a senha o usuário.
   * @param user User
   * @param password string
   * @returns Promise<boolean>
   */
  changePassword(user: User, password: string): Promise<boolean>;

  /**
   * Verifica se o usuário está cadastrado.
   * @param id string | null
   * @param email string
   * @returns Promise<User | boolean>
   */
  userExists(id: string | null, email?: string): Promise<User | false>;

  /**
   * Atualiza as informações do usuário.
   * @param user User
   * @returns Promise<User>
   */
  updateUser(user: User): Promise<User>;
}

export { IUsersRepositories };
