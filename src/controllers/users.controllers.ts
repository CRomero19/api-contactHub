import { Request, Response } from "express";
import { TUser, TUserRequest } from "../interfaces/users.interfaces";
import { createUserService } from "../services/users/createNewUser.service";
import { getAllUsersService } from "../services/users/getAllUsers.service";
import { updateUserService } from "../services/users/updateUser.service";
import { userSchema } from "../schemas/users.schemas";
import { getUserInfo } from "../services/users/getUserInfo.service";
import { getAllUserContactsService } from "../services/users/getAllUserContacts.service";
import { TContact } from "../interfaces/contacts.interfaces";
import { deleteUserService } from "../services/users/delete.service";

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

export const deleteUserController = async(req:Request, res:Response):Promise<Response> =>{
 
    const userId = Number(req.params.id)

    await deleteUserService(userId);

    return res.status(204).send();
} 

export const getUserByIdController = async(req:Request, res:Response):Promise<Response> =>{

    const userId = Number(req.params.id)

    const userInfo:TUser = await getUserInfo(userId)
    
    return res.status(200).json(userInfo)
}


export const getAllUserContactsController = async (req: Request, res: Response): Promise<Response> => {

    const userId = Number(req.params.id);
  
    const userContacts: TContact[] = await getAllUserContactsService(userId);
  
    return res.status(200).json(userContacts);

};