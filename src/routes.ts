import { Request, Response, Router } from "express";

import { createUserFactory } from "./factories/User/CreateUserFactory";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { createCategoryFactory } from "./factories/Category/CreateCategoryFactory";
import { CreateAnimeController } from "./controllers/CreateAnimeController";

import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

const router = Router();

/* --------------------------- Controllers ---------------------------------- */
/**
 * User Controllers.
 */
const authenticateUserController = new AuthenticateUserController();

/**
 * Anime Controllers.
 */
const createAnimeController = new CreateAnimeController();
/* -------------------------------------------------------------------------- */

/* ----------------------------- Routes ------------------------------------- */
router.get("/", (request: Request, response: Response) => {
  return response.json({ data: "Hello World" }).status(200);
});

/* ------------------------------- User ------------------------------------- */
/**
 * Rota para registro de novos usuários.
 */
router.post("/users/register", (request: Request, response: Response) =>
  createUserFactory().handle(request, response)
);

/**
 * Rota para autenticação de usuário.
 */
router.post("/login", authenticateUserController.handle);
/* -------------------------------------------------------------------------- */

/* ----------------------------- Category ----------------------------------- */
/**
 * Rota para criação de uma nova categoria.
 */
router.post(
  "/categories/create",
  ensureAuthenticated,
  (request: Request, response: Response) =>
    createCategoryFactory().handle(request, response)
);
/* -------------------------------------------------------------------------- */

/* ------------------------------- Anime ------------------------------------ */
/**
 * Rota para criação de um novo anime.
 */
router.post(
  "/animes/create",
  ensureAuthenticated,
  createAnimeController.handle
);
/* -------------------------------------------------------------------------- */

export { router };
