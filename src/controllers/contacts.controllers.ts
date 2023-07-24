import { Request, Response } from "express";
import { createNewContactService } from "../services/contacts/createNewContact.service";
import { updateContactService } from "../services/contacts/updateContact.service";
import { contactsSchema } from "../schemas/contacts.schemas";
import { deleteContactService } from "../services/contacts/deleteContact.service";

export const createNewContactController = async(req:Request, res:Response):Promise<Response> =>{

    const userId = Number(res.locals.id)
    const contactData = req.body

    await createNewContactService(userId, contactData)
    
    return res.status(201).json({message: "Contato cadastrado!"})
}

export const updateContactController = async(req:Request, res:Response):Promise<Response> =>{

    const contactData = req.body;
    const userId = Number(req.params.contactId)

    const updatedUser = await updateContactService(userId,contactData);

    const returnContact = contactsSchema.parse(updatedUser[0])

    return res.status(200).json(returnContact)
} 

export const deleteContactController = async(req:Request, res:Response):Promise<Response> =>{
 
    const contactId = Number(req.params.contactId)

    await deleteContactService(contactId);

    return res.status(204).send();
} 