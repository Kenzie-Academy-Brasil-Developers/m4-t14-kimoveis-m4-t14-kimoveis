import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities";
import { AppError } from "../errors/erros";
import { Repository } from "typeorm";

export const veridyIdExistsMiddlewares = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const params: string = req.params?.id;
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const userRepoResult: User | null = await userRepo.findOneBy({
    id: Number(params),
  });

  if (!userRepoResult) {
    throw new AppError("User not found", 404);
  }

  return next();
};
