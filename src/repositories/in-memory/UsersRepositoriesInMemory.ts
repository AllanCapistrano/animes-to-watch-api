import { IUsersRepositories } from "../interfaces/IUsersRepositories";
import { User } from "../../entities/User";

class UsersRepositoriesInMemory implements IUsersRepositories {
  /**
   * Procura um usuário pelo email.
   * @param email string
   * @returns Promise<User>
   */
  async findByEmail(email: string): Promise<User> {
    let user: User | null = null;

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
   * @returns Promise<User>
   */
  async createAndSave(
    name: string,
    email: string,
    password: string,
    avatar: string
  ): Promise<User> {
    let user: User = new User();

    user.name = name;
    user.email = email;
    user.password = password;
    user.avatar = avatar;

    this.users.push(user);

    return user;
  }

  /**
   * Altera a senha do usuário 
   * @param user User
   * @param password string
   * @returns Promise<boolean>
   */
  async changePassword(user: User, password: string): Promise<boolean> {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id === user.id) {
        this.users[i].password = password;

        return true;
      }
    }

    return false;
  }
  private users: User[] = [];
}

export { UsersRepositoriesInMemory };
