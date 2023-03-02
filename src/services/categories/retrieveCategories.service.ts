import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { tCategoriesSchemaRetrieve } from "../../schemas/categories.schema";

export const retrieveCategoriesService = async () => {
  const categoryRepo = AppDataSource.getRepository(Category);

  const categoryRepoResult = await categoryRepo.find({});

  return categoryRepoResult as unknown as tCategoriesSchemaRetrieve;
};
