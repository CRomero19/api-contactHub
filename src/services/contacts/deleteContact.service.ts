import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import Contact from "../../entities/contacts.entity";

export const deleteContactService = async (contactId: number): Promise<void> => {
  const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact);

  const contactToDelete = await contactRepository.findOneBy({ id: contactId});

  if (!contactToDelete) {
    throw new AppError("Contact not found.", 404);
  }

  await contactRepository.delete(contactId);
};