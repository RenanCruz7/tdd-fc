import { FakeUserRepository } from './../infrastructure/repositories/fake_user_repository';
import { UserService } from './user_service';

describe('UserService', () => {	  

    let userService: UserService;
    let fakeUserRepository: FakeUserRepository

    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        userService = new UserService(fakeUserRepository);
    });


    it("Deve retornar null quando um ID invalido for passado", async () => {
        const user = await userService.findUserById('123');
        expect(user).toBeNull();
    });

    it("Deve retornar um usuario quando um ID valido for fornecido", async () => {
        const user = await userService.findUserById('1');
        expect(user).not.toBeNull();
        expect(user?.getId()).toBe('1');
        expect(user?.getName()).toBe('John Doe');
    });

});