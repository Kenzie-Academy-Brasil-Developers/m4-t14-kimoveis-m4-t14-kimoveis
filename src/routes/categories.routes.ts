import { Router } from "express";
import {
  createCategoriesController,
  retrieveCategoriesController,
} from "../controllers/categories/categories.controllers";
import { adminValidMiddleware } from "../middlewares/validAdmin.middlewares";
import { tokenValidationMiddleware } from "../middlewares/validToken.middlwares";
import { verifyCreatedName } from "../middlewares/verifyName.middleware";
import { validBodyMiddleware } from "../middlewares/validBody.middleware";
import { categoriesCreateSchema } from "../schemas/categories.schema";

export const categoriesRoutes: Router = Router();

categoriesRoutes.post(
  "/categories",
  tokenValidationMiddleware,
  adminValidMiddleware,
  verifyCreatedName,
  validBodyMiddleware(categoriesCreateSchema),
  createCategoriesController
);

categoriesRoutes.get("/categories", retrieveCategoriesController);

categoriesRoutes.get("/categories/:id/realEstate");
