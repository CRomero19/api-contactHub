import { NextFunction, Response, Request } from "express"
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import User from "../../entities/users.entity";

export const ensureUserIsRegisteredForLogin = async (req:Request, res:Response, next:NextFunction) :Promise<Response | void> =>{

    const userRepository:Repository<User> = AppDataSource.getRepository(User)
  
    const userEmail  = req.body.email;
    
    const user:User|null = await userRepository.findOneBy( {email: userEmail} );

    if(!user){
        throw new AppError("Invalid credentials" , 401 )
    }

    return next();
}