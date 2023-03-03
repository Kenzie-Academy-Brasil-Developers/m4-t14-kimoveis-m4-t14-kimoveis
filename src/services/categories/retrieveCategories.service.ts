import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";

export const retrieveCategoriesService = async () => {
  const categoryRepo: Repository<Category> =
    AppDataSource.getRepository(Category);

  const categoryRepoResult: Category[] = await categoryRepo.find({});

  return categoryRepoResult;
};
