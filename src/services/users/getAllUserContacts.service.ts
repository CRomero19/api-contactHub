import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import Contact from "../../entities/contacts.entity";
import { TContact } from "../../interfaces/contacts.interfaces";

export const getAllUserContactsService = async (userId:number): Promise<TContact[]> => {

    const contactRepository:Repository<Contact> = AppDataSource.getRepository(Contact);

    const contacts: Contact[] = await contactRepository
    .createQueryBuilder("contact")
    .where("contact.userId = :userId", { userId: userId })
    .getMany();

    const returnContacts: TContact[] = contacts.map((contact) => ({
        id: contact.id,
        name: contact.name,
        email: contact.email,
        telefone:contact.telefone
      }));
    return returnContacts;
}
