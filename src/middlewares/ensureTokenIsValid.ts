import { NextFunction, Response, Request } from "express"
import jwt from "jsonwebtoken"
import "dotenv/config";
import { AppError } from "../errors";
import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";
import User from "../entities/users.entity";

export const ensureTokenIsValid = async (req:Request, res:Response, next:NextFunction) :Promise<Response | void> =>{

    const token:string | undefined = req.headers.authorization;

    if(!token){
        throw new AppError("Missing bearer token", 401)
    }

    let realToken = token.split(" ")[1];
    
    jwt.verify(realToken, process.env.SECRET_KEY!, (err:any, decoded:any)=>{
        if(err){
            throw new AppError(err.message, 401);
        };
        res.locals.id = decoded.sub;
        res.locals.admin = decoded.admin;
    })
   
    const { id }  = res.locals

    const userRepository:Repository<User> = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id: id } });

    res.locals.userData = user;
    
    return next();
}