import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { tUserSchemaRetriveResult } from "../../interfaces/users.types";
import { usersRetrieveResult } from "../../schemas/users.schema";

export const retrieveUsersService =
  async (): Promise<tUserSchemaRetriveResult> => {
    const usersRepo = AppDataSource.getRepository(User);

    const usersRepoResult: User[] = await usersRepo.find({
      withDeleted: true,
    });

    const returnUser: tUserSchemaRetriveResult =
      usersRetrieveResult.parse(usersRepoResult);

    return returnUser;
  };
