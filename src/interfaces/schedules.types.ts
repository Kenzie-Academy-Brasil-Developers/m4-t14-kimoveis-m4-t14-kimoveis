import { z } from "zod";
import {
  createSchedulesSchema,
  schedulesSchema,
} from "../schemas/schedules.schema";

export interface iSchedulesCreateResult {
  message: string;
}

export type tSchedulesSchema = z.infer<typeof schedulesSchema>;

export type tSchedulesSchemaCreate = z.infer<typeof createSchedulesSchema>;
