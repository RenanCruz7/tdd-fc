import { PropertyService } from './property_service';
import { FakePropertyRepository } from './../infrastructure/repositories/fake_property_repository';
import { Property } from '../domain/entities/property';

describe('PropertyService', () => {

    let propertyService: PropertyService;
    let fakePropertyRepository: FakePropertyRepository

    beforeEach(() => {
        fakePropertyRepository = new FakePropertyRepository();
        propertyService = new PropertyService(fakePropertyRepository);
    });


    it("Deve retornar null quando um ID invalido for passado", async () => {
        const property = await propertyService.findPropertyById('123');
        expect(property).toBeNull();
    });

    it("Deve retornar um imovel quando um ID valido for fornecido", async () => {
        const property = await propertyService.findPropertyById('1');
        expect(property).not.toBeNull();
        expect(property?.getId()).toBe('1');
        expect(property?.getName()).toBe('Casa na praia');
    });

    it("Deve salvar um imovel corretamente ", async () => {
        const property = new Property('3', 'Apartamento no centro','Apartamento no centro da cidade' ,4, 1000);
        await fakePropertyRepository.save(property);

        const user = await propertyService.findPropertyById('3');
        expect(user).not.toBeNull();
        expect(user?.getId()).toBe('3');
        expect(user?.getName()).toBe('Apartamento no centro');
    });

}); 