import { AppDataSource } from "../../data-source";
import { Categories } from "../../entities";
import { tCategoriesSchemaRetrieve } from "../../schemas/categories.schema";

export const retrieveCategoriesService = async () => {
  const categoryRepo = AppDataSource.getRepository(Categories);

  const usersRepoResult = await categoryRepo.find({});

  return usersRepoResult as unknown as tCategoriesSchemaRetrieve;
};
