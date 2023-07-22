import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { TUser } from "../../interfaces/users.interfaces";
import { userSchema } from "../../schemas/users.schemas";
import User from "../../entities/users.entity";

export const getAllUsersService = async (): Promise<TUser[]> => {

    const userRepository:Repository<User> = AppDataSource.getRepository(User);

    const users:User[] = await userRepository.find({withDeleted:true});

    const returnUsers = users.map(user => userSchema.parse(user))
    return returnUsers;
}
