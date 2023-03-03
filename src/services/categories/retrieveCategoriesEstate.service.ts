import { Request } from "express";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { AppError } from "../../errors/erros";
import { Repository } from "typeorm";

export const retrieveCategoriesRealEstateService = async (req: Request) => {
  const categoryRepo: Repository<Category> =
    AppDataSource.getRepository(Category);

  const categoryRepoResult: Category | null = await categoryRepo.findOne({
    where: {
      id: Number(req.params.id),
    },
    relations: {
      realEstate: true,
    },
  });

  if (!categoryRepoResult) {
    throw new AppError("Category not found", 404);
  }

  return categoryRepoResult;
};
