import { NextFunction, Response, Request } from "express"
import { ZodTypeAny } from "zod"

export const ensureRequestDataIsValid=(schema:ZodTypeAny) => (req:Request, res:Response, next:NextFunction) : void =>{

    const validatedData = schema.parse(req.body)

    req.body = validatedData

    return next();
}