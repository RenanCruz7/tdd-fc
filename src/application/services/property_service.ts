import { PropertyRepository } from "../../domain/repositories/property_repository";
import { Property } from '../../domain/entities/property';
import { v4 as uuid } from 'uuid';

export class PropertyService {
    constructor(private readonly propertyRepository: PropertyRepository) {}

    async findPropertyById(id: string): Promise<Property | null> {
        return this.propertyRepository.findById(id);
    }

    async createProperty(name: string, description: string, maxGuests: number, basePricePerNight: number): Promise<Property> {
        if (!name) {
            throw new Error('O nome da propriedade é obrigatório.');
        }
        if (maxGuests <= 0) {
            throw new Error('A capacidade máxima deve ser maior que zero.');
        }
        if (basePricePerNight === undefined || basePricePerNight <= 0) {
            throw new Error('O preço base por noite é obrigatório.');
        }

        const property = new Property(uuid(), name, description, maxGuests, basePricePerNight);
        await this.propertyRepository.save(property);
        return property;
    }
}