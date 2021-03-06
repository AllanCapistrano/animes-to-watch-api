import { Request, Response, Router } from "express";

import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

import { createUserFactory } from "./factories/User/CreateUserFactory";
import { authenticateUserFactory } from "./factories/User/AuthenticateUserFactory";
import { forgotPasswordFactory } from "./factories/User/ForgotPasswordFactory";
import { updateUserFactory } from "./factories/User/UpdateUserFactory";
import { removeUserFactory } from "./factories/User/RemoveUserFactory";

import { createCategoryFactory } from "./factories/Category/CreateCategoryFactory";
import { updateCategoryFactory } from "./factories/Category/UpdateCategoryFactory";
import { removeCategoryFactory } from "./factories/Category/RemoveCategoryFactory";
import { listCategoriesFactory } from "./factories/Category/ListCategoriesFactory";

import { createAnimeFactory } from "./factories/Anime/CreateAnimeFactory";
import { updateAnimeFactory } from "./factories/Anime/UpdateAnimeFactory";
import { removeAnimeFactory } from "./factories/Anime/RemoveAnimeFactory";

const router = Router();

/* ============================== Routes ==================================== */
//                                                                            //
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

/**
 * Rota para atualização das informações do usuário.
 */
router.put(
  "/users/update",
  ensureAuthenticated,
  (request: Request, response: Response) =>
    updateUserFactory().handle(request, response)
);

/**
 * Rota para remoção de usuário.
 */
router.delete(
  "/users/delete",
  ensureAuthenticated,
  (request: Request, response: Response) =>
    removeUserFactory().handle(request, response)
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

/**
 * Rota para alterar as informações de uma categoria.
 */
router.put(
  "/categories/update",
  ensureAuthenticated,
  (request: Request, response: Response) =>
    updateCategoryFactory().handle(request, response)
);

/**
 * Rota para remoção de categorias.
 */
router.delete(
  "/categories/delete/:id",
  ensureAuthenticated,
  (request: Request, response: Response) =>
    removeCategoryFactory().handle(request, response)
);

/**
 * Rota para listagem de categorias.
 */
router.get(
  "/categories",
  ensureAuthenticated,
  (request: Request, response: Response) =>
    listCategoriesFactory().handle(request, response)
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

/**
 * Rota para alterar as informações de um anime.
 */
router.put(
  "/animes/update",
  ensureAuthenticated,
  (request: Request, response: Response) =>
    updateAnimeFactory().handle(request, response)
);

/**
 * Rota para a remoção de uma anime.
 */
router.delete(
  "/animes/delete/:id",
  ensureAuthenticated,
  (request: Request, response: Response) =>
    removeAnimeFactory().handle(request, response)
);
/* -------------------------------------------------------------------------- */
//                                                                            //
/* ========================================================================== */

export { router };
