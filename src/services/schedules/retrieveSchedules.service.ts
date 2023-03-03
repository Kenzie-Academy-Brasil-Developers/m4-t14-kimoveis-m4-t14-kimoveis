import { Request } from "express";
import { AppDataSource } from "../../data-source";
import { RealEstate } from "../../entities";
import { AppError } from "../../errors/erros";

export const retrieveSchedulesService = async (req: Request) => {
  const realEstate = AppDataSource.getRepository(RealEstate);

  const realEstateResult: RealEstate | null = await realEstate.findOne({
    where: {
      id: Number(req.params.id),
    },
    relations: {
      schedules: {
        user: true,
      },
      address: true,
      category: true,
    },
  });

  if (!realEstateResult) {
    throw new AppError("RealEstate not found", 404);
  }

  return realEstateResult;
};
