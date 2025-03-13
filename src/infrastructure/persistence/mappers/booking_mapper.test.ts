import { BookingMapper } from './booking_mapper';
import { BookingEntity } from '../entities/booking_entity';
import { Booking } from '../../../domain/entities/booking';
import { PropertyEntity } from '../entities/property_entity';
import { UserEntity } from '../entities/user_entity';
import { Property } from '../../../domain/entities/property';
import { User } from '../../../domain/entities/user';
import { DateRange } from '../../../domain/value_objects/date_range';

describe('BookingMapper', () => {

    it('deve converter BookingEntity em Booking corretamente', () => {
        const propertyEntity = new PropertyEntity();
        propertyEntity.id = '1';
        propertyEntity.name = 'Test Property';
        propertyEntity.description = 'Test Description';
        propertyEntity.maxGuests = 4;
        propertyEntity.basePricePerNight = 100;

        const userEntity = new UserEntity();
        userEntity.id = '1';
        userEntity.name = 'Test User';

        const bookingEntity = new BookingEntity();
        bookingEntity.id = '1';
        bookingEntity.property = propertyEntity;
        bookingEntity.guest = userEntity;
        bookingEntity.startDate = new Date('2021-10-10');
        bookingEntity.endDate = new Date('2021-10-15');
        bookingEntity.guestCount = 2;
        bookingEntity.status = 'CONFIRMED';
        bookingEntity.totalPrice = 500;

        const booking = BookingMapper.toDomain(bookingEntity);

        expect(booking.getId()).toBe('1');
        expect(booking.getProperty().getId()).toBe('1');
        expect(booking.getUser().getId()).toBe('1');
        expect(booking.getDateRange().getStartDate()).toEqual(new Date('2021-10-10'));
        expect(booking.getDateRange().getEndDate()).toEqual(new Date('2021-10-15'));
        expect(booking.getGuestCount()).toBe(2);
        expect(booking.getStatus()).toBe('CONFIRMED');
        expect(booking.getTotalPrice()).toBe(500);
    });

    it('deve converter Booking em BookingEntity corretamente', () => {
        const property = new Property('1', 'Test Property', 'Test Description', 4, 100);
        const user = new User('1', 'Test User');
        const dateRange = new DateRange(new Date('2021-10-10'), new Date('2021-10-15'));

        const booking = new Booking('1', property, user, dateRange, 2);
        booking['status'] = 'CONFIRMED';
        booking['totalPrice'] = 500;

        const bookingEntity = BookingMapper.toPersistence(booking);

        expect(bookingEntity.id).toBe('1');
        expect(bookingEntity.property.id).toBe('1');
        expect(bookingEntity.guest.id).toBe('1');
        expect(bookingEntity.startDate).toEqual(new Date('2021-10-10'));
        expect(bookingEntity.endDate).toEqual(new Date('2021-10-15'));
        expect(bookingEntity.guestCount).toBe(2);
        expect(bookingEntity.status).toBe('CONFIRMED');
        expect(bookingEntity.totalPrice).toBe(500);
    });

    it('deve lançar erro de validação ao faltar campos obrigatórios no BookingEntity', () => {
        const bookingEntity = new BookingEntity();
        // Deixando campos obrigatórios faltando
        bookingEntity.id = '1';
        // bookingEntity.property está faltando
        bookingEntity.guest = new UserEntity();
        bookingEntity.startDate = new Date('2021-10-10');
        bookingEntity.endDate = new Date('2021-10-15');
        bookingEntity.guestCount = 2;
        bookingEntity.status = 'CONFIRMED';
        bookingEntity.totalPrice = 500;

        expect(() => BookingMapper.toDomain(bookingEntity)).toThrow('Campos obrigatórios estão faltando no BookingEntity');
    });
});