import { Router } from "express";
import { userLoginController } from "../controllers/users/usersLogin.controllers";
import { validBodyMiddleware } from "../middlewares/validBody.middleware";
import { usersLoginSchema } from "../schemas/usersLogin.schema";

export const usersLoginRoutes: Router = Router();

usersLoginRoutes.post(
  "/login",
  validBodyMiddleware(usersLoginSchema),
  userLoginController
);
