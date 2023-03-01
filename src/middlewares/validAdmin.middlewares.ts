import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/erros";

export const adminValidMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.jwtAdminUser) {
    throw new AppError("Insufficient Permission", 403);
  }

  return next();
};
