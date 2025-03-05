import { Property } from './../../domain/entities/property';
import { UserEntity } from './../persistence/entities/user_entity';
import { PropertyEntity } from './../persistence/entities/property_entity';
import { DataSource, Repository } from "typeorm";
import { BookingEntity } from "../persistence/entities/booking_entity";
import { TypeORMBookingRepository } from "./typeorm_booking_repository";
import { User } from '../../domain/entities/user';
import { DateRange } from '../../domain/value_objects/date_range';
import { Booking } from '../../domain/entities/booking';


describe('TypeORMBookingRepository', () => {
    let dataSource: DataSource;
    let bookingRepository: TypeORMBookingRepository;

    beforeAll(async () => {
        dataSource = new DataSource({
            type: 'sqlite',
            database: ':memory:',
            dropSchema: true,
            entities: [PropertyEntity, BookingEntity, UserEntity],
            synchronize: true,
            logging: false
        });
        await dataSource.initialize();
        bookingRepository = new TypeORMBookingRepository(
            dataSource.getRepository(BookingEntity)
        );
    });

    afterAll(async () => {
        await dataSource.destroy();
    });


    it("Deve criar uma reserva corretamente e savlar", async () => {
        const propertyRepository = dataSource.getRepository(PropertyEntity);
        const userRepository = dataSource.getRepository(UserEntity);

        const propertyEntity = propertyRepository.create({
            id: '1',
            name: 'Casa na praia',
            description: 'Casa muito bonita na praia',
            maxGuests: 6,
            basePricePerNight: 200
        });

        await propertyRepository.save(propertyEntity);

        const userEntity = userRepository.create({
            id: '1',
            name: 'John Doe',
        })

        await userRepository.save(userEntity);


        const user = new User('1', 'John Doe');
        const property = new Property('1', 'Casa na praia', 'Casa muito bonita na praia', 6, 200);
        const dateRange = new DateRange(new Date('2021-01-01'), new Date('2021-01-05'));

        const booking = new Booking('1',property ,user, dateRange, 4);

        await bookingRepository.save(booking);


        const savedBooking = await bookingRepository.findById('1');
        expect(savedBooking).not.toBeNull();
        expect(savedBooking?.getId()).toBe('1');
        expect(savedBooking?.getProperty().getId()).toBe('1');
        expect(savedBooking?.getUser().getId()).toBe('1');

    });

});