import { Request, Response, Router } from "express";

import { CreateUserController } from "./controllers/CreateUserController";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";

const router = Router();

/**
 * Controllers
 */
const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();

router.get("/", (request: Request, response: Response) => {
  return response.json({ data: "Hello World" }).status(200);
});

/**
 * Rota para registro de novos usuários.
 */
router.post("/users/register", createUserController.handle);

/**
 * Rota para autenticação de usuário.
 */
router.post("/login", authenticateUserController.handle);

export { router };
