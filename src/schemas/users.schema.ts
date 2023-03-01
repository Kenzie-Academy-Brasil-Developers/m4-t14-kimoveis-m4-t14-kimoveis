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

export type tUserSchema = z.infer<typeof usersSchema>;

export type tUserSchemaCreate = Omit<
  tUserSchema,
  "id" | "createdAt" | "updatedAt" | "deletedAt"
>;

export type tUserSchemaCreateResult = Omit<tUserSchema, "password">;

export type tUserSchemaRetriveResult = Array<tUserSchemaCreateResult>;

export type tUserSchemaUpdate = Omit<
  tUserSchema,
  "id" | "admin" | "createdAt" | "deletedAt" | "updatedAt"
>;

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
