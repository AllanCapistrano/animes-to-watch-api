import { Request, Response, Router } from "express";

const router = Router();

router.get("/", (request: Request, response: Response) => {
  return response.json({ data: "Hello World" }).status(200);
});

export { router };
