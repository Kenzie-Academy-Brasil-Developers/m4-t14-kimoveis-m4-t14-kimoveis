import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import {
  tUserSchemaRetriveResult,
  usersRetrieveResult,
} from "../../schemas/users.schema";

export const retrieveUsersService =
  async (): Promise<tUserSchemaRetriveResult> => {
    const usersRepo = AppDataSource.getRepository(User);

    const usersRepoResult = await usersRepo.find({
      withDeleted: true,
    });

    const returnUser = usersRetrieveResult.parse(usersRepoResult);

    console.log(returnUser);

    return returnUser;
  };
