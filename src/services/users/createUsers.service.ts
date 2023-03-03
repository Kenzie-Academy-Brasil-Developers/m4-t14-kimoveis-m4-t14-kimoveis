import {
  tUserSchemaCreate,
  tUserSchemaCreateResult,
  usersCreateResult,
} from "../../schemas/users.schema";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { Repository } from "typeorm";

export const createUsersServices = async (
  payload: tUserSchemaCreate
): Promise<tUserSchemaCreateResult> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);
  const user: User = userRepo.create(payload as User);

  await userRepo.save(user);

  const returnUser: tUserSchemaCreateResult = usersCreateResult.parse(user);

  return returnUser;
};
