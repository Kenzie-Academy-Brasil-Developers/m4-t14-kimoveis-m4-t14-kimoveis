import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { tCategoriesSchemaCreate } from "../../interfaces/categories.types";

export const createCategoriesService = async (
  paylaod: tCategoriesSchemaCreate
): Promise<Category> => {
  const categoryRepo = AppDataSource.getRepository(Category);
  const category: Category = categoryRepo.create(paylaod);

  await categoryRepo.save(category);

  return category;
};
