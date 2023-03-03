import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import {
  tUserSchemaRetriveResult,
  usersRetrieveResult,
} from "../../schemas/users.schema";

export const retrieveUsersService =
  async (): Promise<tUserSchemaRetriveResult> => {
    const usersRepo: Repository<User> = AppDataSource.getRepository(User);

    const usersRepoResult: User[] = await usersRepo.find({
      withDeleted: true,
    });

    const returnUser: tUserSchemaRetriveResult =
      usersRetrieveResult.parse(usersRepoResult);

    return returnUser;
  };
