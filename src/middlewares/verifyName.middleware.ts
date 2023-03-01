import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Categories } from "../entities";
import { AppError } from "../errors/erros";

export const verifyCreatedName = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const name = req.body.name;
  const categoryRepo = AppDataSource.getRepository(Categories);

  if (name) {
    const categoryRepoResult = await categoryRepo.findOneBy({
      name: name,
    });

    if (categoryRepoResult) {
      throw new AppError("Category already exists", 409);
    }
  }

  return next();
};
