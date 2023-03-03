import { usersCreateResult } from "../../schemas/users.schema";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import {
  tUserSchemaCreate,
  tUserSchemaCreateResult,
} from "../../interfaces/users.types";

export const createUsersServices = async (
  payload: tUserSchemaCreate
): Promise<tUserSchemaCreateResult> => {
  const userRepo = AppDataSource.getRepository(User);
  const user: User = userRepo.create(payload as User);

  await userRepo.save(user);

  const returnUser: tUserSchemaCreateResult = usersCreateResult.parse(user);

  return returnUser;
};
