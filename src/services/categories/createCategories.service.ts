import { AppDataSource } from "../../data-source";
import { Categories } from "../../entities";
import { tCategoriesSchemaCreate } from "../../schemas/categories.schema";

export const createCategoriesService = async (
  paylaod: tCategoriesSchemaCreate
): Promise<Categories> => {
  const categoryRepo = AppDataSource.getRepository(Categories);
  const category = categoryRepo.create(paylaod);

  await categoryRepo.save(category);

  return category;
};
