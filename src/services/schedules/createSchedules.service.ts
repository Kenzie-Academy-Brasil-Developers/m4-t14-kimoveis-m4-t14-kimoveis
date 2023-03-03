import { AppDataSource } from "../../data-source";
import { RealEstate, Schedule, User } from "../../entities";
import { AppError } from "../../errors/erros";
import {
  iSchedulesCreateResult,
  tSchedulesSchemaCreate,
} from "../../interfaces/schedules.types";

export const createSchedulesService = async (
  schedulesInfo: tSchedulesSchemaCreate,
  idUser: string
): Promise<iSchedulesCreateResult> => {
  const schedulesRepo = AppDataSource.getRepository(Schedule);
  const userRepo = AppDataSource.getRepository(User);
  const realEstate = AppDataSource.getRepository(RealEstate);

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
