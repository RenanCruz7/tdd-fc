import { DataSource, Repository } from "typeorm";
import { UserEntity } from "../persistence/entities/user_entity";
import { TypeORMPropertyRepository } from "./typeorm_property_repository";
import { PropertyEntity } from "../persistence/entities/property_entity";
import { Property } from "../../domain/entities/property";
import { BookingEntity } from "../persistence/entities/booking_entity";


describe('TypeORMPropertyRepository', () => {
    let dataSource: DataSource;
    let propertyRepository: TypeORMPropertyRepository;
    let repository: Repository<PropertyEntity>;

    beforeAll(async () => {
        dataSource = new DataSource({
            type: 'sqlite',
            database: ':memory:',
            dropSchema: true,
            entities: [UserEntity,PropertyEntity,BookingEntity],
            synchronize: true,
            logging: false
        });
        await dataSource.initialize();
        repository = dataSource.getRepository(PropertyEntity);
        propertyRepository = new TypeORMPropertyRepository(repository);
    });


    afterAll(async () => {
        await dataSource.destroy();
    });


    it('Deve criar uma propriedade corretamente e salvar ', async () => {
        const property = new Property(
            '1',
            'Casa na Praia',
            'Vista para o mar',
            6,
            200
        )

        await propertyRepository.save(property);
        const savedProperty = await repository.findOne({where: {id: '1'}});
        expect(savedProperty).not.toBeNull();
        expect(savedProperty?.id).toBe('1');
    });

    it('Deve buscar uma propriedade com um ID valido', async () => {
        const property = new Property(
            '1',
            'Casa na Praia',
            'Vista para o mar',
            6,
            300
        )

        await propertyRepository.save(property);
        const savedProperty = await propertyRepository.findById('1');
        expect(savedProperty).not.toBeNull();
        expect(savedProperty?.getId()).toBe('1');
        expect(savedProperty?.getName()).toBe('Casa na Praia');
    });

});