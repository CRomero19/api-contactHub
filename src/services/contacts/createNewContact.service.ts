import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { TContact } from "../../interfaces/contacts.interfaces";
import Contact from "../../entities/contacts.entity";
import User from "../../entities/users.entity";

export const createNewContactService = async (userId:number, contactData:TContact): Promise<Contact> => {

  const contactRepository:Repository<Contact> = AppDataSource.getRepository(Contact)
  const userRepository:Repository<User> = AppDataSource.getRepository(User)

  const user = await userRepository.findOne({where:{id:userId}})

  if(!user){
    throw new AppError('User not found',404)
  }

  const newContact = contactRepository.create({
    ...contactData,
    user:user
  })

  await contactRepository.save(newContact) 

  return newContact;
  
};