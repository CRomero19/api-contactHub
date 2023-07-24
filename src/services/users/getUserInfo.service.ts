import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import User from "../../entities/users.entity";
import { userSchema } from "../../schemas/users.schemas";
import { TUser } from "../../interfaces/users.interfaces";

export const getUserInfo = async (userId:number): Promise<TUser> => {

    const userRepository:Repository<User> = AppDataSource.getRepository(User);

    const user:User | null= await userRepository.findOneBy({id:userId});

    if(!user){
        throw new AppError('User not found',404)
    }

    return userSchema.parse(user);
}