import "dotenv/config";
import jwt from "jsonwebtoken"
import * as bcrypt from 'bcryptjs'
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { Repository } from "typeorm";
import { TLoginRequest, TLoginResponse } from "../../interfaces/login.interfaces";
import User from "../../entities/users.entity";

export const loginService = async (userData:TLoginRequest): Promise<TLoginResponse> => {

    const userRepository:Repository<User> = AppDataSource.getRepository(User);
    const user:User | null = await userRepository.findOneBy({ email: userData.email } );
    
    const comparePassword = await bcrypt.compare(
        userData.password, 
        user!.password
    );

    if(!comparePassword){
        throw new AppError('Invalid credentials', 401)
    }

    const token:string = jwt.sign(
        {
            admin:user!.admin
        },
        process.env.SECRET_KEY!,
        {
            expiresIn:"1d",
            subject:user!.id.toString()
        }
    )

    return { token, userId: user!.id };
};
