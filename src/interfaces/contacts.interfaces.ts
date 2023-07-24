import { z } from "zod";
import { DeepPartial } from "typeorm";
import { contactsSchema } from "../schemas/contacts.schemas";
import Contact from "../entities/contacts.entity";

export type TContact = z.infer<typeof contactsSchema>
export type TUpdateContactRequest = DeepPartial<Contact>