import { Repository } from "typeorm";
import { TUser, TUserRequest } from "../../interfaces/users.interfaces";
import { AppDataSource } from "../../data-source";
import { userSchema } from "../../schemas/users.schemas";
import User from "../../entities/users.entity";

export const createUserService = async (userData:TUserRequest): Promise<TUser> => {

  const userRepository:Repository<User> = AppDataSource.getRepository(User)

  const newUser = userRepository.create(userData)
  
  await userRepository.save(newUser) 

  return userSchema.parse(newUser);
};