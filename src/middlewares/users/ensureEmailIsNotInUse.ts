import { NextFunction, Response, Request } from "express"
import { Repository } from "typeorm";
import { User } from "../../entities";
import { AppError } from "../../errors";
import { AppDataSource } from "../../data-source";

export const ensureEmailIsNotInUse = async (req:Request, res:Response, next:NextFunction) :Promise<Response | void> =>{

    const newUserEmail  = req.body.email;
    
    if(newUserEmail){
        const userRepository:Repository<User> = AppDataSource.getRepository(User)

        const user:User[] = await userRepository.find({where: { email: newUserEmail }});

        if(user.length > 0){
            throw new AppError("Email already exists" ,409 )
        }
    }
    
    return next();
}



