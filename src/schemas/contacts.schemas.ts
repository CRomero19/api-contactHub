import { z } from 'zod'

export const contactsSchema = z.object({
    name: z.string().max(120),
    email: z.string().max(45),
    telefone: z.string().max(15)
})