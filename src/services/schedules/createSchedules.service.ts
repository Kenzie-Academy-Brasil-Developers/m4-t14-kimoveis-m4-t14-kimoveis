import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate, Schedule, User } from "../../entities";
import { AppError } from "../../errors/erros";
import { iSchedulesCreateResult } from "../../interfaces/schedules.types";
import { tSchedulesSchemaCreate } from "../../schemas/schedules.schema";

export const createSchedulesService = async (
  schedulesInfo: tSchedulesSchemaCreate,
  idUser: string
): Promise<iSchedulesCreateResult> => {
  const schedulesRepo: Repository<Schedule> =
    AppDataSource.getRepository(Schedule);
  const userRepo: Repository<User> = AppDataSource.getRepository(User);
  const realEstate: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const userRepoResult: User | null = await userRepo.findOneBy({
    id: Number(idUser),
  });
  if (!userRepoResult) {
    throw new AppError("User not found", 404);
  }

  let realEstateResult: RealEstate | null;

  if (schedulesInfo.realEstateId) {
    realEstateResult = await realEstate.findOneBy({
      id: Number(schedulesInfo.realEstateId),
    });

    if (!realEstateResult) {
      throw new AppError("RealEstate not found", 404);
    }
  }

  const schedulesRepoCreate: Schedule = schedulesRepo.create({
    ...schedulesInfo,
    realEstate: realEstateResult!,
    user: userRepoResult!,
  });

  await schedulesRepo.save(schedulesRepoCreate);

  return { message: "Schedule created" };
};
