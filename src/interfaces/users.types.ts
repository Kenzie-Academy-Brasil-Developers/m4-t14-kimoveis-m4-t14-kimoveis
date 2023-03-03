import { z } from "zod";
import {
  usersCreateSchema,
  usersSchema,
  usersUpdateSchema,
} from "../schemas/users.schema";

export interface iUserUpdateBody {
  name: string;
  email: string;
  password: string;
}

export interface iUserUpdateInfo {
  id: string;
  admin: boolean;
  params: string;
}

export type tUserSchema = z.infer<typeof usersSchema>;

export type tUserSchemaCreate = z.infer<typeof usersCreateSchema>;

export type tUserSchemaCreateResult = Omit<tUserSchema, "password">;

export type tUserSchemaRetriveResult = Array<tUserSchemaCreateResult>;

export type tUserSchemaUpdate = z.infer<typeof usersUpdateSchema>;

export type tUserLoginSchema = z.infer<typeof usersSchema>;
