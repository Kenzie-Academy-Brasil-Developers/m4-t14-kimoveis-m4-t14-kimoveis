import { Request, Response } from "express";
import { createRealEstateService } from "../../services/realEstate/createRealEstate.service";
import { retrieveRealEstateService } from "../../services/realEstate/retrieveRealEstate.service";
import { RealEstate } from "../../entities";
import { tRealEstateSchemaCreate } from "../../interfaces/realEstate.types";

export const createRealEstateControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const estateInfo: tRealEstateSchemaCreate = req.body;

  const createdEstate: RealEstate = await createRealEstateService(estateInfo);

  return res.status(201).json(createdEstate);
};

export const retrieveRealEstateControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const estateResult: RealEstate[] = await retrieveRealEstateService();

  return res.status(200).json(estateResult);
};
