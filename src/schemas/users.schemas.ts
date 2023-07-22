import { z } from 'zod'

export const userSchema = z.object({
    id: z.number(),
    name: z.string().max(45),
    email: z.string().max(45).email(),
    admin: z.boolean().default(false),
    password: z.string().max(120),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string().nullish(),
    telefone: z.string().max(45)
}).omit({ password: true });

export const userSchemaRequest = z.object({
    name: z.string().max(45),
    email: z.string().max(45).email(),
    password: z.string().max(120),
    admin: z.boolean().default(false),
});

export const updateUserRequestSchema = userSchemaRequest.omit({ id:true, admin:true }).partial();