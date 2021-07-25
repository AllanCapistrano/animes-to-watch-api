import { Request, Response, Router } from "express";

import { CreateUserController } from "./controllers/CreateUserController";

const router = Router();

/**
 * Controllers
 */
const createUserController = new CreateUserController();

router.get("/", (request: Request, response: Response) => {
  return response.json({ data: "Hello World" }).status(200);
});

/**
 * Rota para registro de novos usuários.
 */
router.post("/users/register", createUserController.handle);

export { router };
