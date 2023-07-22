import { z } from "zod";
import { loginSchema, responseLoginSchema } from "../schemas/login.schemas";

export type TLoginRequest = z.infer<typeof loginSchema>

export type TLoginResponse = z.infer<typeof responseLoginSchema>

