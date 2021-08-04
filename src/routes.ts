import { Request, Response, Router } from "express";

import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

import { createUserFactory } from "./factories/User/CreateUserFactory";
import { authenticateUserFactory } from "./factories/User/AuthenticateUserFactory";
import { forgotPasswordFactory } from "./factories/User/ForgotPasswordFactory";

import { createCategoryFactory } from "./factories/Category/CreateCategoryFactory";

import { createAnimeFactory } from "./factories/Anime/CreateAnimeFactory";

const router = Router();

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
router.post("/login", (request: Request, response: Response) =>
  authenticateUserFactory().handle(request, response)
);

/**
 * Rota para alterar a senha quando o usuáio não lembra da mesma.
 */
router.patch("/forgot-password", (request: Request, response: Response) =>
  forgotPasswordFactory().handle(request, response)
);
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
  (request: Request, response: Response) =>
    createAnimeFactory().handle(request, response)
);
/* -------------------------------------------------------------------------- */

export { router };
