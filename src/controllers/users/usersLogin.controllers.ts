import { Request, Response } from "express";
import { createLoginService } from "../../services/usersLogin/createLogin.service";
import { tUserLoginSchema } from "../../schemas/usersLogin.schema";

export const userLoginController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userInfo: tUserLoginSchema = req.body;

  const token = await createLoginService(userInfo);

  return res.json(token);
};
