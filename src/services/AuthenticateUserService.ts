import { readFileSync } from "fs";

import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { validate } from "email-validator";

import { IUsersRepositories } from "../repositories/interfaces/IUsersRepositories";

interface IAuthenticateUser {
  email: string;
  password: string;
}

class AuthenticateUserService {
  /**
   * Método construtor.
   * @param usersRepositories IUsersRepositories
   */
  constructor(private usersRepositories: IUsersRepositories) {}

  /**
   * Realiza a autenticação do usuário.
   * @param user User
   * @returns string
   */
  async execute({ email, password }: IAuthenticateUser) {
    if (!validate(email)) {
      throw new Error("Email inválido! Tente novamente.");
    }

    const user = await this.usersRepositories.findByEmail(email);

    if (!user) {
      throw new Error("Email/Senha incorretos! Tente Novamente.");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Email/Senha incorretos! Tente Novamente.");
    }

    /**
     * Leitura da chave privada.
     */
    const privateKey = readFileSync("private.key");

    const token = sign(
      {
        email: user.email,
      },
      privateKey,
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );

    return token;
  }
}

export { AuthenticateUserService };
