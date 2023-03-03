import { Request, Response } from "express";
import { createLoginService } from "../../services/usersLogin/createLogin.service";
import { tUserLoginSchema } from "../../interfaces/users.types";

export const userLoginController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userInfo: tUserLoginSchema = req.body;

  const token: string = await createLoginService(userInfo);

  return res.json(token);
};
