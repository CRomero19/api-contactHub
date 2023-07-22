import { z } from "zod";
import { userSchema, userSchemaRequest } from "../schemas/users.schemas";
import { DeepPartial } from "typeorm";
import User from "../entities/users.entity";

export type TUser = z.infer<typeof userSchema>
export type TUserRequest = z.infer<typeof userSchemaRequest>
export type TUpdateUserRequest = DeepPartial<User>