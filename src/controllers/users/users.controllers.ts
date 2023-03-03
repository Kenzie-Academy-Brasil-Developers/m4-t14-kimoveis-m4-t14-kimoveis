import { Request, Response } from "express";
import { createUsersServices } from "../../services/users/createUsers.service";
import { retrieveUsersService } from "../../services/users/retrieveUsers.service";
import { updateUserService } from "../../services/users/updateUsers.service";
import {
  iUserUpdateBody,
  iUserUpdateInfo,
  tUserSchemaCreate,
  tUserSchemaCreateResult,
  tUserSchemaRetriveResult,
} from "../../interfaces/users.types";
import { deletedUserService } from "../../services/users/deletedUsers.service";

export const createUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userInfo: tUserSchemaCreate = req.body;

  const createdUser: tUserSchemaCreateResult = await createUsersServices(
    userInfo
  );

  return res.status(201).json(createdUser);
};

export const retrieveUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const users: tUserSchemaRetriveResult = await retrieveUsersService();

  return res.status(200).json(users);
};

export const updateUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userBody: iUserUpdateBody = req.body;
  const userInfo: iUserUpdateInfo = {
    id: req.jwtIdUser,
    admin: req.jwtAdminUser,
    params: req.params.id,
  };

  const newUser: tUserSchemaCreateResult = await updateUserService(
    userBody,
    userInfo
  );

  return res.status(200).json(newUser);
};

export const deletedUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  await deletedUserService(req);

  return res.status(204).send();
};
