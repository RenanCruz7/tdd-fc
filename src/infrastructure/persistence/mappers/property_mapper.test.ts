import { PropertyMapper } from './property_mapper';
import { PropertyEntity } from '../entities/property_entity';
import { Property } from '../../../domain/entities/property';

describe('PropertyMapper', () => {

    it('deve converter PropertyEntity em Property corretamente', () => {
        const propertyEntity = new PropertyEntity();
        propertyEntity.id = '1';
        propertyEntity.name = 'Test Property';
        propertyEntity.description = 'Test Description';
        propertyEntity.maxGuests = 4;
        propertyEntity.basePricePerNight = 100;

        const property = PropertyMapper.toDomain(propertyEntity);

        expect(property.getId()).toBe('1');
        expect(property.getName()).toBe('Test Property');
        expect(property.getDescription()).toBe('Test Description');
        expect(property.getMaxGuests()).toBe(4);
        expect(property.getBasePricePerNight()).toBe(100);
    });

    it('deve converter Property em PropertyEntity corretamente', () => {
        const property = new Property('1', 'Test Property', 'Test Description', 4, 100);

        const propertyEntity = PropertyMapper.toPersistence(property);

        expect(propertyEntity.id).toBe('1');
        expect(propertyEntity.name).toBe('Test Property');
        expect(propertyEntity.description).toBe('Test Description');
        expect(propertyEntity.maxGuests).toBe(4);
        expect(propertyEntity.basePricePerNight).toBe(100);
    });

    it('deve lançar erro de validação ao faltar campos obrigatórios no PropertyEntity', () => {
        const propertyEntity = new PropertyEntity();
        // Deixando campos obrigatórios faltando
        propertyEntity.id = '1';
        propertyEntity.name = 'Test Property';
        // propertyEntity.description está faltando
        propertyEntity.maxGuests = 4;
        propertyEntity.basePricePerNight = 100;

        expect(() => PropertyMapper.toDomain(propertyEntity)).toThrow(Error);
    });
})