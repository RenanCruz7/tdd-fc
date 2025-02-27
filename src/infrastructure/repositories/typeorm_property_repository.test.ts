import { DataSource, Repository } from "typeorm";
import { UserEntity } from "../persistence/entities/user_entity";
import { TypeORMPropertyRepository } from "./typeorm_property_repository";
import { PropertyEntity } from "../persistence/entities/property_entity";


describe('TypeORMPropertyRepository', () => {
    let dataSource: DataSource;
    let propertyRepository: TypeORMPropertyRepository;
    let repository: Repository<PropertyEntity>;

    beforeAll(async () => {
        dataSource = new DataSource({
            type: 'sqlite',
            database: ':memory:',
            dropSchema: true,
            entities: [UserEntity,PropertyEntity],
            synchronize: true,
            logging: false
        });
        await dataSource.initialize();
        repository = dataSource.getRepository(UserEntity);
        propertyRepository = new TypeORMPropertyRepository(repository);
    });


    afterAll(async () => {
        await dataSource.destroy();
    });


    it('Deve criar uma propriedade corretamente ', async () => {

    });

});