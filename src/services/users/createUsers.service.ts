import {
  tUserSchemaCreate,
  tUserSchemaCreateResult,
  usersCreateResult,
} from "../../schemas/users.schema";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";

export const createUsersServices = async (
  payload: tUserSchemaCreate
): Promise<tUserSchemaCreateResult> => {
  const userRepo = AppDataSource.getRepository(User);
  const user = userRepo.create(payload as User);

  await userRepo.save(user);

  const returnUser = usersCreateResult.parse(user);

  return returnUser;
};
