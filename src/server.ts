import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";

import "./database";
import { router } from "./routes";

const app = express();
const PORT = 3000;

/**
 * Permitindo a utilização de JSON.
 */
app.use(express.json());
/**
 * Inserindo as rotas criadas no arquivo routes.ts
 */
app.use(router);

/**
 * Middleware para exibição das mensagens geradas pelas exceções.
 */
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
      return response.status(400).json({
        error: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
);

app.listen(PORT, () => console.log(`Server is running on the port ${PORT}...`));
