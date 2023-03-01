import { Router } from "express";
import {
  createUserController,
  deletedUsersController,
  retrieveUsersController,
  updateUsersController,
} from "../controllers/users/users.controllers";
import { validBodyMiddleware } from "../middlewares/validBody.middleware";
import { usersCreateSchema, usersUpdateSchema } from "../schemas/users.schema";
import { verifyCreatedEmail } from "../middlewares/verifyEmail.middleware";
import { tokenValidationMiddleware } from "../middlewares/validToken.middlwares";
import { adminValidMiddleware } from "../middlewares/validAdmin.middlewares";
import { veridyIdExistsMiddlewares } from "../middlewares/veridyId.middlewares";

export const usersRoutes: Router = Router();

usersRoutes.post(
  "/users",
  verifyCreatedEmail,
  validBodyMiddleware(usersCreateSchema),
  createUserController
);

usersRoutes.get(
  "/users",
  tokenValidationMiddleware,
  adminValidMiddleware,
  retrieveUsersController
);

usersRoutes.patch(
  "/users/:id",
  veridyIdExistsMiddlewares,
  tokenValidationMiddleware,
  verifyCreatedEmail,
  validBodyMiddleware(usersUpdateSchema),
  updateUsersController
);

usersRoutes.delete(
  "/users/:id",
  veridyIdExistsMiddlewares,
  tokenValidationMiddleware,
  adminValidMiddleware,
  deletedUsersController
);
