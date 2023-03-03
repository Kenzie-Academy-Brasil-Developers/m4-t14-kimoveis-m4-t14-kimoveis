import { z } from "zod";

export const addressSchema = z.object({
  id: z.number().positive().int(),
  street: z.string().trim().max(45),
  zipCode: z.string().trim().max(8),
  number: z.string().max(7).nullable().optional(),
  city: z.string().trim().max(20),
  state: z.string().trim().max(2),
});

export const addressSchemaCreate = addressSchema.omit({
  id: true,
});
