import { Router } from "express";
import {
  createCategoriesController,
  retrieveCategoriesController,
} from "../controllers/categories/categories.controllers";
import { adminValidMiddleware } from "../middlewares/validAdmin.middlewares";
import { tokenValidationMiddleware } from "../middlewares/validToken.middlwares";
import { verifyCreatedName } from "../middlewares/verifyName.middleware";

export const categoriesRoutes: Router = Router();

categoriesRoutes.post(
  "/categories",
  tokenValidationMiddleware,
  adminValidMiddleware,
  verifyCreatedName,
  createCategoriesController
);

categoriesRoutes.get("/categories", retrieveCategoriesController);

categoriesRoutes.get("/categories/:id/realEstate");
