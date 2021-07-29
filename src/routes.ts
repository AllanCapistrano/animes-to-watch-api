import { Request, Response, Router } from "express";

import { CreateUserController } from "./controllers/CreateUserController";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateCategoryController } from "./controllers/CreateCategoryController";

const router = Router();

/* --------------------------- Controllers ---------------------------------- */
/**
 * User Controllers.
 */
const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();

/**
 * Category Controllers.
 */
const createCategoryController = new CreateCategoryController();
/* -------------------------------------------------------------------------- */

/* ----------------------------- Routes ------------------------------------- */
router.get("/", (request: Request, response: Response) => {
  return response.json({ data: "Hello World" }).status(200);
});

/* ------------------------------- User ------------------------------------- */
/**
 * Rota para registro de novos usuários.
 */
router.post("/users/register", createUserController.handle);

/**
 * Rota para autenticação de usuário.
 */
router.post("/login", authenticateUserController.handle);
/* -------------------------------------------------------------------------- */

/* ----------------------------- Category ----------------------------------- */
/**
 * Rota para criação de uma nova categoria.
 */
router.post("/categories/create", createCategoryController.handle);
/* -------------------------------------------------------------------------- */

export { router };
