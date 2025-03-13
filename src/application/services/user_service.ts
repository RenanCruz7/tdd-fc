import { UserRepository } from "../../domain/repositories/user_repository";
import { User } from "../../domain/entities/user";
import { v4 as uuid } from 'uuid';

export class UserService {

    // Injecting the repository and using them to get the user in the fake repository
    constructor(private readonly userRepository: UserRepository) {}

    async findUserById(id: string): Promise<User | null>  {
        return this.userRepository.findById(id);
    }

    async createUser(name: string): Promise<User> {
        if (!name) {
            throw new Error('O campo nome é obrigatório.');
        }

        const user = new User(uuid(), name);
        await this.userRepository.save(user);
        return user;
    }
}