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


    it('Deve lançar um erro se o numero de hospedes for 0 ou negativo', () => {
        const property = new Property('1', 'Casa de praia', 'Casa de praia em Guarapari', 4, 200);
        const user = new User('1', 'João');
        const dateRange = new DateRange(new Date('2024-12-20'), new Date('2024-12-25'));

        expect(() => new Booking('1', property, user, dateRange, 0)).toThrow('Numero de hospedes deve ser maior que 0');
    });

    it('Deve lançar um erro se o numero maximo de hospedes for excedido', () => {
        const property = new Property('1', 'Casa de praia', 'Casa de praia em Guarapari', 4, 200);
        const user = new User('1', 'João');
        const dateRange = new DateRange(new Date('2024-12-20'), new Date('2024-12-25'));

        expect(() => new Booking('1', property, user, dateRange, 5)).toThrow('Numero de hospedes excede o limite da propriedade');
    });

    it('deve calcular o preço total sem desconto', () => {
        // Arrange
        const property = new Property('1', 'Casa de praia', 'Casa de praia em Guarapari', 4, 300);
        const user = new User('1', 'João');
        const dateRange = new DateRange(new Date('2024-12-20'), new Date('2024-12-25'));

        // Act
        const booking = new Booking('1', property, user, dateRange, 4);

        // Assert
        expect(booking.getTotalPrice()).toBe(1500);
    });
    it('deve calcular o preço total com desconto', () => {
        // Arrange
        const property = new Property('1', 'Casa de praia', 'Casa de praia em Guarapari', 4, 300);
        const user = new User('1', 'João');
        const dateRange = new DateRange(new Date('2024-12-01'), new Date('2024-12-10'));

        // Act
        const booking = new Booking('1', property, user, dateRange, 4);

        // Assert
        expect(booking.getTotalPrice()).toBe(2430);
    });

    it('Nao deve realizar o agendamento quando a propriedade nao estiver disponivel', () => {
        const property = new Property('1', 'Casa de praia', 'Casa de praia em Guarapari', 4, 300);
        const user = new User('1', 'João');
        const dateRange = new DateRange(new Date('2024-12-01'), new Date('2024-12-10'));

        new Booking('1', property, user, dateRange, 4);

        const dateRange2 = new DateRange(new Date('2024-12-05'), new Date('2024-12-15'));

        expect(() => new Booking('2', property, user, dateRange2, 4)).toThrow('Propriedade não disponível para o período solicitado');
    });

    it('Deve cancelar uma reserva sem reembolso quando faltam menos de 1 dia para o check-in', () => {
        const property = new Property('1', 'Casa de praia', 'Casa de praia em Guarapari', 4, 300);
        const user = new User('1', 'João');
        const dateRange = new DateRange(new Date('2024-12-20'), new Date('2024-12-22'));

        const booking = new Booking('1', property, user, dateRange, 4);

        const currentDate = new Date('2024-12-20');

        booking.cancel(currentDate);

        expect(booking.getStatus()).toBe('CANCELLED');
        expect(booking.getTotalPrice()).toBe(600);
    });

    it('Deve cancelar uma reserva com reembolso total quando a data for superior a 7 dias antes do cancelamento', () => {
        const property = new Property('1', 'Casa de praia', 'Casa de praia em Guarapari', 4, 300);
        const user = new User('1', 'João');
        const dateRange = new DateRange(new Date('2024-12-20'), new Date('2024-12-22'));

        const booking = new Booking('1', property, user, dateRange, 4);

        const currentDate = new Date('2024-12-10');

        booking.cancel(currentDate);

        expect(booking.getStatus()).toBe('CANCELLED');
        expect(booking.getTotalPrice()).toBe(0);
    });


    it('Deve cancelar uma reserva com reembolso parcial quando a data estiver entre 1 e 7 dias antes do check in', () => {
        const property = new Property('1', 'Casa de praia', 'Casa de praia em Guarapari', 4, 300);
        const user = new User('1', 'João');
        const dateRange = new DateRange(new Date('2024-12-20'), new Date('2024-12-25'));

        const booking = new Booking('1', property, user, dateRange, 4);

        const currentDate = new Date('2024-12-15');

        booking.cancel(currentDate);

        expect(booking.getStatus()).toBe('CANCELLED');
        expect(booking.getTotalPrice()).toBe(750);
    });


});