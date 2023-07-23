import { Request, Response } from "express";
import { loginService } from "../services/login/login.service";

export const loginController = async(req:Request, res:Response):Promise<Response> =>{
    const userData = req.body;

    const { token, userId } = await loginService(userData);

    return res.status(200).json({ token, userId });
}