import { Request, Response } from "express";
import { createSchedulesService } from "../../services/schedules/createSchedules.service";
import { retrieveSchedulesService } from "../../services/schedules/retrieveSchedules.service";
import {
  iSchedulesCreateResult,
  tSchedulesSchemaCreate,
} from "../../interfaces/schedules.types";
import { RealEstate } from "../../entities";

export const createSchedulesControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const schedulesInfo: tSchedulesSchemaCreate = req.body;
  const idUser: string = req.jwtIdUser;

  const schedulesResult: iSchedulesCreateResult = await createSchedulesService(
    schedulesInfo,
    idUser
  );

  return res.status(201).json(schedulesResult);
};

export const retrieveSchedulesControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const schedulesResult: RealEstate = await retrieveSchedulesService(req);

  return res.status(200).json(schedulesResult);
};
