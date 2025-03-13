import { Request, Response } from 'express';
import { UserService } from '../../application/services/user_service';

export class UserController {
    constructor(private readonly userService: UserService) {}

    async createUser(req: Request, res: Response): Promise<void> {
        try {
            const { name } = req.body;
            const user = await this.userService.createUser(name);
            res.status(201).json(user);
        } catch (error) {
            const errorMessage = (error as Error).message;
            res.status(400).json({ message: errorMessage });
        }
    }
}