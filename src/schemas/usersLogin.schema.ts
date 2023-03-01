import { z } from "zod";

export const usersSchema = z.object({
  email: z.string().trim().max(45).email(),
  password: z.string().trim().max(120).min(6),
});

export type tUserLoginSchema = z.infer<typeof usersSchema>;

export const usersLoginSchema = usersSchema;
