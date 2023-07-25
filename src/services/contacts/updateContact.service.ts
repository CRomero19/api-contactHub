import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { TUserRequest } from "../../interfaces/users.interfaces";
import Contact from "../../entities/contacts.entity";


export const updateContactService = async (contactId:number,contactData:TUserRequest): Promise<Contact[]> => {

    const contactRepository:Repository<Contact> = AppDataSource.getRepository(Contact);

    const contact:Contact | null= await contactRepository.findOneBy({id:contactId});

    if(!contact){
        throw new AppError('Contact not found',404)
    }

    if (contactData.name !== undefined && contactData.name.trim() !== '') {
        contact.name = contactData.name;
    }
    if (contactData.email !== undefined && contactData.email.trim() !== '') {
        contact.email = contactData.email;
    }
    if (contactData.telefone !== undefined && contactData.telefone.trim() !== '') {
        contact.telefone = contactData.telefone;
    }

    await contactRepository.save(contact);

    const updatedContactInfo: Contact[] = await contactRepository.find({ where: { id: contactId } });

    return updatedContactInfo;
};