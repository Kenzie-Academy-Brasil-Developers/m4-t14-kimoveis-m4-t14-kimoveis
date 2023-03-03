import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Category } from "../entities";
import { AppError } from "../errors/erros";
import { Repository } from "typeorm";

export const verifyCreatedName = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const name: string = req.body.name;
  const categoryRepo = AppDataSource.getRepository(Category);

  if (name) {
    const categoryRepoResult: Category | null = await categoryRepo.findOneBy({
      name: name,
    });

    if (categoryRepoResult) {
      throw new AppError("Category already exists", 409);
    }
  }

  return next();
};
