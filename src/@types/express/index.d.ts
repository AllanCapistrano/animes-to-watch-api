/**
 * Para permitir que exista o atributo user_id em Request.
 */
declare namespace Express {
  export interface Request {
    user_id: string;
  }
}
