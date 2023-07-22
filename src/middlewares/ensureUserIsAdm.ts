import { NextFunction, Response, Request } from "express"
import { AppError } from "../errors";

export const ensureUserIsAdm = async (req:Request, res:Response, next:NextFunction) :Promise<Response | void> =>{

    const { admin } = res.locals

    if(!admin){
        throw new AppError('Insufficient permission',403)
    }

    return next();
}



