import { Repository } from "typeorm";
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
    const userRepo: Repository<User> = AppDataSource.getRepository(User);

    const userData: User | null = await userRepo.findOneBy({
      id: Number(userInfo.params),
    });

    const updateUsers: User = userRepo.create({ ...userData, ...payload });

    await userRepo.save(updateUsers);

    const returnUser: tUserSchemaCreateResult =
      usersCreateResult.parse(updateUsers);

    return returnUser;
  } else {
    throw new AppError("Insufficient permission", 403);
  }
};
