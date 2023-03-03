import { z } from "zod";

export const usersSchema = z.object({
  id: z.number().positive().int(),
  name: z.string().trim().max(45),
  email: z.string().trim().max(45).email(),
  admin: z.boolean().optional(),
  password: z.string().trim().max(120).min(4),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullable(),
});

export const usersCreateSchema = usersSchema.omit({
  id: true,
  createdAt: true,
  deletedAt: true,
  updatedAt: true,
});

export const usersCreateResult = usersSchema.omit({
  password: true,
});

export const usersRetrieveResult = usersCreateResult.array();

export const usersUpdateSchema = usersSchema
  .omit({
    id: true,
    admin: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
  })
  .partial();

export const userSchedulesSchema = usersSchema.omit({
  name: true,
  createdAt: true,
  deletedAt: true,
  email: true,
  password: true,
  updatedAt: true,
});
