import { DataSource, Repository } from "typeorm";
import { BookingEntity } from "../persistence/entities/booking_entity";
import { TypeORMBookingRepository } from "./typeorm_booking_repository";


describe('TypeORMPropertyRepository', () => {
    let dataSource: DataSource;
    let propertyRepository: TypeORMBookingRepository;
    let repository: Repository<BookingEntity>;

    beforeAll(async () => {
        dataSource = new DataSource({
            type: 'sqlite',
            database: ':memory:',
            dropSchema: true,
            entities: [BookingEntity],
            synchronize: true,
            logging: false
        });
        await dataSource.initialize();
        repository = dataSource.getRepository(BookingEntity);
        propertyRepository = new TypeORMBookingRepository(repository);
    });


    afterAll(async () => {
        await dataSource.destroy();
    });

});