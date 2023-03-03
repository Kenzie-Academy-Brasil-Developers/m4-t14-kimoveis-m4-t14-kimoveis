import { z } from "zod";
import {
  realEstateCreateSchema,
  realEstateSchemaResult,
} from "../schemas/realEstate.schema";

export type tRealEstateSchema = z.infer<typeof realEstateSchemaResult>;

export type tRealEstateSchemaCreate = z.infer<typeof realEstateCreateSchema>;

export type tRealEstateSchemaNewEstate = Omit<
  tRealEstateSchema,
  "id" | "address" | "categoryId" | "createdAt" | "updatedAt" | "sold"
>;
