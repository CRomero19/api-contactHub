import { Request, Response } from "express";
import { TUser, TUserRequest } from "../interfaces/users.interfaces";
import { createUserService } from "../services/users/createNewUser.service";
import { getAllUsersService } from "../services/users/getAllUsers.service";
import { updateUserService } from "../services/users/updateUser.service";
import { softDeleteUserService } from "../services/users/softDelete.service";
import { userSchema } from "../schemas/users.schemas";

export const registerNewUserController = async(req:Request, res:Response):Promise<Response> =>{ 

    const userData:TUserRequest = req.body
   
    const newUser = await createUserService(userData)

    return res.status(201).json(newUser)
}

export const getAllUsersController = async(req:Request, res:Response):Promise<Response> =>{

    const allUsers:TUser[]= await getAllUsersService()
    
    return res.status(200).json(allUsers)
}

export const updateUserController = async(req:Request, res:Response):Promise<Response> =>{

    const userData = req.body;
    const userId = Number(req.params.id)

    const updatedUser = await updateUserService(userId,userData);

    const returnUser = userSchema.parse(updatedUser[0])

    return res.status(200).json(returnUser)
} 

export const softDeleteUserController = async(req:Request, res:Response):Promise<Response> =>{
 
    const userId = Number(req.params.id)

    await softDeleteUserService(userId);

    return res.status(204).send();
} 
