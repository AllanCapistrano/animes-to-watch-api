import { IUsersRepositories } from "../interfaces/IUsersRepositories";
import { User } from "../../entities/User";

class UsersRepositoriesInMemory implements IUsersRepositories {
  private users: User[] = [];

  /**
   * Procura um usuário cadastrado pelo email.
   * @param email string
   * @returns User
   */
  async findByEmail(email: string): Promise<User> {
    let user = null;

    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].email === email) {
        user = this.users[i];
        break;
      }
    }

    return user;
  }

  /**
   * Cria um usuário e salva no Array.
   * @param name string
   * @param email string
   * @param password string
   * @param avatar string | null
   * @returns User
   */
  async createAndSave(
    name: string,
    email: string,
    password: string,
    avatar: string
  ): Promise<User> {
    let user = new User();

    user.name = name;
    user.email = email;
    user.password = password;
    user.avatar = avatar;

    this.users.push(user);

    return user;
  }
}

export { UsersRepositoriesInMemory };