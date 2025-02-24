import { UserRepository } from "../../domain/repositories/user_repository";
import { User } from "../../domain/entities/user";

export class UserService {

    // Injecting the repository and using them to get the user in the fake repository
    constructor(private readonly userRepository: UserRepository) {}

    async findUserById(id: string): Promise<User | null>  {
        return this.userRepository.findById(id);
    }
}