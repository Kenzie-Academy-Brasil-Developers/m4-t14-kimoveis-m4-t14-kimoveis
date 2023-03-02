import { z } from "zod";

export const schedulesSchema = z.object({
  id: z.number().positive().int(),
  date: z.string(),
  hour: z.string(),
  realEstateId: z.number().int(),
  userId: z.number().int().positive(),
});

export type tSchedulesSchema = z.infer<typeof schedulesSchema>;

export type tSchedulesSchemaCreate = Omit<tSchedulesSchema, "id" | "userId">;

export const createSchedulesSchema = schedulesSchema.omit({
  id: true,
  userId: true,
});
