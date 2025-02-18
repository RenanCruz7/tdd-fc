import { Property } from "./property";
import { User } from "./user";
import { DateRange } from "../value_objects/date_range";
import { Booking } from "./booking";

describe('Booking Entity', () => {

    it('Deve criar uma instancia de Booking com todos os atributos', () => {
        const property = new Property('1', 'Casa de praia', 'Casa de praia em Guarapari', 4, 200);
        const user = new User('1', 'João');
        const dateRange = new DateRange(new Date('2024-12-20'), new Date('2024-12-25'));

        const booking = new Booking('1', property, user, dateRange,4);
        
        expect(booking.getId()).toBe('1');
        expect(booking.getProperty()).toBe(property);
        expect(booking.getUser()).toBe(user);
        expect(booking.getDateRange()).toBe(dateRange);
        expect(booking.getGuestCount()).toBe(4);
    });
});