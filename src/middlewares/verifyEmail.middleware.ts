import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities";
import { AppError } from "../errors/erros";
import { Repository } from "typeorm";

export const verifyCreatedEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const emailUser: string = req.body.email;
  const userRepo = AppDataSource.getRepository(User);

  if (emailUser) {
    const userRepoResult: User | null = await userRepo.findOneBy({
      email: emailUser,
    });

    if (userRepoResult) {
      throw new AppError("Email already exists", 409);
    }
  }

  return next();
};
