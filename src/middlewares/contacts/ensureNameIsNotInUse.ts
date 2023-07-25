import { NextFunction, Response, Request } from "express"
import { Repository } from "typeorm";
import { AppError } from "../../errors";
import { AppDataSource } from "../../data-source";
import Contact from "../../entities/contacts.entity";

export const ensureNameIsNotInUse = async (req:Request, res:Response, next:NextFunction) :Promise<Response | void> =>{
    const userId = Number(res.locals.id)
    const newUserName  = req.body.name;
    
    if(newUserName){
        const contactRepository:Repository<Contact> = AppDataSource.getRepository(Contact)

        const contact:Contact[] = await contactRepository.find({where: { name: newUserName }});

        if(contact.length > 0){
            throw new AppError("Name already in use!" ,409 )
        }
    }
    
    return next();
}
