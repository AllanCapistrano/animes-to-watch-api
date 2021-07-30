import { readFileSync } from "fs";

import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  /**
   * Pegando o token passado na requisição.
   */
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response
      .status(401)
      .json({
        error: "É necessário fornecer um token de autenticação para continuar.",
      })
      .end();
  }

  /**
   * Pegando somente o valor o token.
   * Esse array irá ter somente duas posições. Utilizando dessa forma, o JS irá
   * ignorar a primeira posição, e colocará o conteúdo da segunda posição em
   * token.
   */
  const [, token] = authToken.split(" ");

  /**
   * Leitura da chave privada.
   */
  const privateKey = readFileSync("private.key");

  try {
    /**
     * Validando o token e atribuindo a sub;
     *
     * as IPayload para poder realizar a atribuição à request.user_id.
     */
    const { sub } = verify(token, privateKey) as IPayload;

    request.user_id = sub;

    return next();
  } catch (error) {
    return response
      .status(401)
      .json({
        error: "Token de autenticação inválido! Tente novamente.",
      })
      .end();
  }
}
