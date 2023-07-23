import { z } from 'zod'

export const loginSchema = z.object({
    email: z.string().max(45),
    password: z.string().max(120)
})

export const responseLoginSchema = z.object({
    token:z.string(),
    userId:z.number()
});
