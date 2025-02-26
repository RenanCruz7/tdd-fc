import { Type } from './../../../node_modules/path-scurry/dist/commonjs/index.d';
import { DataSource, Repository } from "typeorm";
import { User } from "../../domain/entities/user";
import { UserEntity } from "../persistence/entities/user_entity";
import { TypeORMUserRepository } from "./typeorm_user_repository";

describe('TypeORMUserRepository', () => {
    let dataSource: DataSource;
    let userRepository: TypeORMUserRepository;
    let repository: Repository<UserEntity>;

    beforeAll(async () => {
        dataSource = new DataSource({
            type: 'sqlite',
            database: ':memory:',
            dropSchema: true,
            entities: [UserEntity],
            synchronize: true,
            logging: false
        });
        await dataSource.initialize();
        repository = dataSource.getRepository(UserEntity);
        userRepository = new TypeORMUserRepository(repository);
    });


    afterAll(async () => {
        await dataSource.destroy();
    });

    it('Deve criar um usuário com sucesso', async () => {
        const user = new User('1', 'John Doe');

        await userRepository.save(user);

        const savedUser = await repository.findOne({ where: { id: '1' } });

        expect(savedUser).not.toBeNull();
        expect(savedUser?.id).toBe('1');
    });

    it('Deve buscar um usuário pelo id', async () => {
        const user = new User('2', 'John Doe');

        await userRepository.save(user);

        const savedUser = await userRepository.findById('2');

        expect(savedUser).not.toBeNull();
        expect(savedUser?.getId()).toBe('2');
    });


    it('Deve retornar null ao buscar um usuario inexistente', async () => {
        
        const savedUser = await userRepository.findById('99');

        expect(savedUser).toBeNull();
    });

});