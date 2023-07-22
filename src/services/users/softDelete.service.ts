import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";

import { AppError } from "../../errors";
import User from "../../entities/users.entity";

export const softDeleteUserService = async (userId: number): Promise<void> => {

    const userRepository: Repository<User> = AppDataSource.getRepository(User);

    const userToDeactivate: User | undefined | null= await userRepository
        .createQueryBuilder("user")
        .withDeleted()
        .where("user.id = :userId", { userId })
        .getOne();

    if (!userToDeactivate || userToDeactivate.deletedAt) {
        throw new AppError('User not found', 404)
    }

    await userRepository.softRemove(userToDeactivate);
}