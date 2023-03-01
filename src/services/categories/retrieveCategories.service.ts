import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { tCategoriesSchemaRetrieve } from "../../schemas/categories.schema";

export const retrieveCategoriesService = async () => {
  const categoryRepo = AppDataSource.getRepository(Category);

  const usersRepoResult = await categoryRepo.find({});

  return usersRepoResult as unknown as tCategoriesSchemaRetrieve;
};
