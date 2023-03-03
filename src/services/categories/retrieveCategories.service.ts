import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";

export const retrieveCategoriesService = async () => {
  const categoryRepo = AppDataSource.getRepository(Category);

  const categoryRepoResult: Category[] = await categoryRepo.find({});

  return categoryRepoResult;
};
