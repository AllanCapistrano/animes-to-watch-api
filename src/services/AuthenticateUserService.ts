import { readFileSync } from "fs";

import { getCustomRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { validate } from "email-validator";

import { UsersRepositories } from "../repositories/UsersRepositories";

interface IAuthenticateUser {
  email: string;
  password: string;
}

class AuthenticateUserService {
  /**
   * Realiza a autenticação do usuário.
   * @param user User
   * @returns string
   */
  async execute({ email, password }: IAuthenticateUser) {
    const usersRepositories = getCustomRepository(UsersRepositories);

    if (!validate(email)) {
      throw new Error("Email inválido! Tente novamente.");
    }

    const user = await usersRepositories.findOne({ email });

    if (!user) {
      throw new Error("Email/Password incorretos! Tente Novamente.");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Email/Password incorretos! Tente Novamente.");
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
