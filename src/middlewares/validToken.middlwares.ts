import { NextFunction, Request, Response } from "express";
import { VerifyErrors, VerifyOptions, verify } from "jsonwebtoken";
import { AppError } from "../errors/erros";

export const tokenValidationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response<any, Record<string, any>>> => {
  const authToken: string | undefined = req.headers.authorization;

  if (!authToken) {
    throw new AppError("Missing bearer token", 401);
  }

  const token = authToken.split(" ")[1];

  verify(
    token,
    String(process.env.SECRET_KEY),
    (error: VerifyErrors | null, decoded: any): VerifyOptions => {
      if (error) {
        throw new AppError(error.message, 401);
      }

      req.jwtEmailUser = decoded.email;
      req.jwtIdUser = decoded.sub;
      req.jwtAdminUser = decoded.admin;

      return {};
    }
  );

  return next();
};
