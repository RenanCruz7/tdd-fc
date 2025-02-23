import { User } from "../domain/entities/user";
import { UserRepository } from "../domain/repositories/user_repository";

export class UserService {

    // Injecting the repository and using them to get the user in the fake repository
    constructor(private readonly userRepository: UserRepository) {}

    async findUserById(id: string): Promise<User | null>  {
        return this.userRepository.findById(id);
    }
}