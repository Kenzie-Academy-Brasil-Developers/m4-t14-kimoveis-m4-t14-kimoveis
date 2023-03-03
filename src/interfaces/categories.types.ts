import { z } from "zod";
import {
  categoriesCreateSchema,
  categoriesSchema,
} from "../schemas/categories.schema";

export type tCategoriesSchema = z.infer<typeof categoriesSchema>;

export type tCategoriesSchemaCreate = z.infer<typeof categoriesCreateSchema>;

export type tCategoriesSchemaRetrieve = Array<tCategoriesSchema>;
