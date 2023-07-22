import { NextFunction, Response, Request } from "express"
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { AppError } from "../../errors";

export const ensureUserIsRegisteredForUsersRoute = async (req:Request, res:Response, next:NextFunction) :Promise<Response | void> =>{

    const userRepository:Repository<User> = AppDataSource.getRepository(User)

    const userId  = Number(req.params.id);

    const user:User | null = await userRepository.findOneBy( { id: userId });
        
    if(!user){
        throw new AppError("User not found" , 404 )
    }

    return next();
}










