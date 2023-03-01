import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { AppError } from "../../errors/erros";
import { iUserUpdateBody, iUserUpdateInfo } from "../../interfaces/users.types";
import {
  tUserSchemaCreateResult,
  usersCreateResult,
} from "../../schemas/users.schema";

export const updateUserService = async (
  payload: iUserUpdateBody,
  userInfo: iUserUpdateInfo
): Promise<tUserSchemaCreateResult> => {
  if (
    userInfo.admin === true ||
    Number(userInfo.id) === Number(userInfo.params)
  ) {
    const userRepo = AppDataSource.getRepository(User);

    const userData = await userRepo.findOneBy({
      id: Number(userInfo.params),
    });

    const updateUsers = userRepo.create({ ...userData, ...payload });

    await userRepo.save(updateUsers);

    const returnUser = usersCreateResult.parse(updateUsers);

    return returnUser;
  } else {
    throw new AppError("Insufficient permission", 403);
  }
};
