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

    it('deve lancar um erro se o nome da residencia for vazio', () => {
        expect(() => new Property('2', '', 'Casa de praia em Guarapari', 4, 200)).toThrow('Nome da propriedade deve ser preenchido');
    });


    it('deve lancar um erro se o numero de hospedes for 0 ou negativo', () => {
        expect(() => new Property('2', 'Casa teste', 'Casa de praia em Guarapari', 0, 200)).toThrow('Numero de hospedes deve ser maior que 0');
        expect(() => new Property('2', 'Casa teste', 'Casa de praia em Guarapari', -1, 200)).toThrow('Numero de hospedes deve ser maior que 0');
    });

    it('deve validar o numero maximo de hospedes', () => {
        const property = new Property('3', 'Casa de campo', 'Casa de campo linda', 5, 500);

        expect(() =>{
            property.validateGuestCount(6);

        }).toThrow('Numero de hospedes excede o limite da propriedade');
    });

});