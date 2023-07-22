import { NextFunction, Response, Request } from "express"
import "dotenv/config";
import { AppError } from "../../errors";

export const ensureUserIsAllowed = async (req:Request, res:Response, next:NextFunction) :Promise<Response | void> =>{

    const { id }  = res.locals
    const paramId:string = req.params.id
    const { userData } = res.locals
    
    if(userData.admin === false && id != paramId){
        throw new AppError("Insufficient permission", 403)
    }
    
    return next();
}