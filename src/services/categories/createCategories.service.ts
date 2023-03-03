import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { tCategoriesSchemaCreate } from "../../schemas/categories.schema";

export const createCategoriesService = async (
  paylaod: tCategoriesSchemaCreate
): Promise<Category> => {
  const categoryRepo: Repository<Category> =
    AppDataSource.getRepository(Category);
  const category: Category = categoryRepo.create(paylaod);

  await categoryRepo.save(category);

  return category;
};
