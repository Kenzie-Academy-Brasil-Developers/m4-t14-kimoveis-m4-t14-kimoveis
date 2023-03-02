import { Request, Response } from "express";
import { tRealEstateSchemaCreate } from "../../schemas/realEstate.schema";
import { createRealEstateService } from "../../services/realEstate/createRealEstate.service";
import { retrieveRealEstateService } from "../../services/realEstate/retrieveRealEstate.service";

export const createRealEstateControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const estateInfo: tRealEstateSchemaCreate = req.body;

  const createdEstate = await createRealEstateService(estateInfo);

  return res.status(201).json(createdEstate);
};

export const retrieveRealEstateControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const estateResult = await retrieveRealEstateService();

  return res.status(200).json(estateResult);
};
