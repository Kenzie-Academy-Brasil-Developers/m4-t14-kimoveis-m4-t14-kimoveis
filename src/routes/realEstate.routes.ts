import { Router } from "express";
import { tokenValidationMiddleware } from "../middlewares/validToken.middlwares";
import { adminValidMiddleware } from "../middlewares/validAdmin.middlewares";
import {
  createRealEstateControllers,
  retrieveRealEstateControllers,
} from "../controllers/realEstate/realEstate.controllers";
import { validBodyMiddleware } from "../middlewares/validBody.middleware";
import { realEstateCreateSchema } from "../schemas/realEstate.schema";

export const realEstateRoutes: Router = Router();

realEstateRoutes.post(
  "/realEstate",
  tokenValidationMiddleware,
  adminValidMiddleware,
  validBodyMiddleware(realEstateCreateSchema),
  createRealEstateControllers
);

realEstateRoutes.get("/realEstate", retrieveRealEstateControllers);
