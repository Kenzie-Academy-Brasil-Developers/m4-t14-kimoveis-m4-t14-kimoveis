import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { tCategoriesSchemaCreate } from "../../schemas/categories.schema";

export const createCategoriesService = async (
  paylaod: tCategoriesSchemaCreate
): Promise<Category> => {
  const categoryRepo = AppDataSource.getRepository(Category);
  const category = categoryRepo.create(paylaod);

  await categoryRepo.save(category);

  return category;
};
