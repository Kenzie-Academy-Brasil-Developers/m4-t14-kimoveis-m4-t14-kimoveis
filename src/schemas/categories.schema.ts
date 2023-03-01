import { z } from "zod";

export const categoriesSchema = z.object({
  id: z.number().positive().int(),
  name: z.string().max(45).trim(),
});

export type tCategoriesSchema = z.infer<typeof categoriesSchema>;

export type tCategoriesSchemaCreate = Omit<tCategoriesSchema, "id">;

export type tCategoriesSchemaRetrieve = Array<tCategoriesSchema>;

export const categoriesCreateSchema = categoriesSchema.omit({
  id: true,
});
