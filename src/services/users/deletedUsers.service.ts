import { Request } from "express";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { Repository } from "typeorm";

export const deletedUserService = async (payload: Request): Promise<void> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await userRepo.findOne({
    where: {
      id: Number(payload.params.id),
    },
  });

  await userRepo.softRemove(user!);
};
