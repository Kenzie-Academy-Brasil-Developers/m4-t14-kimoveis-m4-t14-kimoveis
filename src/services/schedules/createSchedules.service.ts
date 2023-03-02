import { AppDataSource } from "../../data-source";
import { RealEstate, Schedule, User } from "../../entities";
import { AppError } from "../../errors/erros";
import { tSchedulesSchemaCreate } from "../../schemas/schedules.schema";

export const createSchedulesService = async (
  schedulesInfo: tSchedulesSchemaCreate,
  idUser: string
): Promise<{ message: string }> => {
  const schedulesRepo = AppDataSource.getRepository(Schedule);
  const userRepo = AppDataSource.getRepository(User);
  const realEstate = AppDataSource.getRepository(RealEstate);

  const schedulesBuilderHour = await schedulesRepo
    .createQueryBuilder("schedules_users_properties")
    .where("schedules_users_properties.date = :date", {
      date: schedulesInfo.date,
    })
    .andWhere("schedules_users_properties.realEstate = :estate", {
      estate: schedulesInfo.realEstateId,
    })
    .andWhere("schedules_users_properties.hour = :hour", {
      hour: schedulesInfo.hour,
    })
    .getOne();

  if (schedulesBuilderHour) {
    throw new AppError(
      "Schedule to this real estate at this date and time already exists",
      409
    );
  }

  const schedulesBuilderUser = await schedulesRepo
    .createQueryBuilder("schedules_users_properties")
    .where("schedules_users_properties.date = :date", {
      date: schedulesInfo.date,
    })
    .andWhere("schedules_users_properties.hour = :hour", {
      hour: schedulesInfo.hour,
    })
    .andWhere("schedules_users_properties.userId = :id", { id: idUser })
    .getOne();

  if (schedulesBuilderUser) {
    throw new AppError(
      "User schedule to this real estate at this date and time already exists",
      409
    );
  }

  const userRepoResult = await userRepo.findOneBy({
    id: Number(idUser),
  });
  if (!userRepoResult) {
    throw new AppError("User not found", 404);
  }

  const [hourString, minute] = schedulesInfo.hour.split(":");
  if (Number(hourString) < 8 || Number(hourString) > 18) {
    throw new AppError("Invalid hour, available times are 8AM to 18PM", 400);
  }

  const diaUtil = new Date(schedulesInfo.date);
  const day = diaUtil.getDay();
  diaUtil.getHours();
  if (day === 0 || day === 6) {
    throw new AppError("Invalid date, work days are monday to friday", 400);
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

  const schedulesRepoCreate = schedulesRepo.create({
    ...schedulesInfo,
    realEstate: realEstateResult!,
    user: userRepoResult!,
  });

  await schedulesRepo.save(schedulesRepoCreate);

  return { message: "Schedule created" };
};
