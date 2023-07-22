import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { TUser } from "../../interfaces/users.interfaces";
import { userSchema } from "../../schemas/users.schemas";

export const getAllUsersService = async (): Promise<TUser[]> => {

    const userRepository:Repository<User> = AppDataSource.getRepository(User);

    const users:User[] = await userRepository.find({withDeleted:true});

    const returnUsers = users.map(user => userSchema.parse(user))
    return returnUsers;
}
