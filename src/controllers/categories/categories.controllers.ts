import { Request, Response } from "express";
import { createCategoriesService } from "../../services/categories/createCategories.service";
import { retrieveCategoriesService } from "../../services/categories/retrieveCategories.service";
import { retrieveCategoriesRealEstateService } from "../../services/categories/retrieveCategoriesEstate.service";
import { Category } from "../../entities";
import {
  tCategoriesSchemaCreate,
  tCategoriesSchemaRetrieve,
} from "../../interfaces/categories.types";

export const createCategoriesController = async (
  req: Request,
  res: Response
) => {
  const categoryInfo: tCategoriesSchemaCreate = req.body;

  const category: Category = await createCategoriesService(categoryInfo);

  return res.status(201).json(category);
};

export const retrieveCategoriesController = async (
  req: Request,
  res: Response
) => {
  const category: tCategoriesSchemaRetrieve = await retrieveCategoriesService();

  return res.status(200).json(category);
};

export const retrieveCategoriesRealEstateControllers = async (
  req: Request,
  res: Response
) => {
  const categoryRealEstate: Category =
    await retrieveCategoriesRealEstateService(req);

  return res.status(200).json(categoryRealEstate);
};
