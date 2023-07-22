import { NextFunction, Response, Request } from "express"
import { Repository } from "typeorm";
import { User } from "../../entities";
import { AppError } from "../../errors";
import { AppDataSource } from "../../data-source";

export const ensureUserIsActive = async (req:Request, res:Response, next:NextFunction) :Promise<Response | void> =>{

    const newUserEmail  = req.body.email;
    
    if(newUserEmail){
        const userRepository:Repository<User> = AppDataSource.getRepository(User)

        const user: User | null = await userRepository.createQueryBuilder('user')
        .where('user.email = :email', { email: newUserEmail })
        .withDeleted() 
        .getOne();

        if(user!.deletedAt != null){
            throw new AppError("Invalid credentials" ,401 )
        }
    }
    
    return next();
}
