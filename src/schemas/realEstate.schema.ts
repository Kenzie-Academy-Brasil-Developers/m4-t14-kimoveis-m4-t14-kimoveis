import { z } from "zod";
import { addressSchemaCreate } from "./address.schema";

export const realEstateSchema = z.object({
  id: z.number().positive().int(),
  value: z.number().or(z.string()),
  size: z.number().positive().int(),
  sold: z.boolean().default(false),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const realEstateSchemaResult = realEstateSchema.extend({
  address: addressSchemaCreate,
  categoryId: z.number().positive().optional(),
});

export const realEstateCreateSchema = realEstateSchemaResult.omit({
  id: true,
  sold: true,
  createdAt: true,
  updatedAt: true,
});

export const realEstateCreateResultSchema = realEstateSchema.omit({
  createdAt: true,
  id: true,
  sold: true,
  updatedAt: true,
});
