import { PropertyRepository } from '../domain/repositories/property_repository';
import { Property } from './../domain/entities/property';

export class PropertyService {
    constructor(private readonly propertyRepository: PropertyRepository) {}

    async findPropertyById(id: string): Promise<Property | null> {
        return this.propertyRepository.findById(id);
    }
}