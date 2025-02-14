import { Property } from './property';

describe('Property Entity', () => {

    it('deve criar uma instancia de Property com todos os atributos', () => { 
        const property = new Property(
            '1',
            'Casa de praia',
            'Casa de praia em Guarapari',
            4,
            200
        );
        expect(property.getId()).toBe('1');
        expect(property.getName()).toBe('Casa de praia');
        expect(property.getDescription()).toBe('Casa de praia em Guarapari');
        expect(property.getMaxGuests()).toBe(4);
        expect(property.getBasePricePerNight()).toBe(200);
    });

});