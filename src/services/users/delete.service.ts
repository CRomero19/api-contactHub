import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import User from "../../entities/users.entity";

export const deleteUserService = async (userId: number): Promise<void> => {
    const userRepository: Repository<User> = AppDataSource.getRepository(User);

    const userToDelete: User | null = await userRepository.findOneBy({id:userId});

    if (!userToDelete) {
        throw new AppError('User not found', 404);
    }

    await userRepository.remove(userToDelete);
}