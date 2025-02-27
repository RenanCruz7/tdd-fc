import { PropertyEntity } from '../entities/property_entity';
import { Property } from './../../../domain/entities/property';
export class PropertyMapper{
    static toDomain(propertyEntity: PropertyEntity): Property {
        return new Property(
            propertyEntity.id,
            propertyEntity.name,
            propertyEntity.description,
            propertyEntity.maxGuests,
            propertyEntity.basePricePerNight
        );
    }

    static toPersistence(property: Property): PropertyEntity {
        const propertyEntity = new PropertyEntity();
        propertyEntity.id = property.getId();
        propertyEntity.name = property.getName();
        propertyEntity.description = property.getDescription();
        propertyEntity.maxGuests = property.getMaxGuests();
        propertyEntity.basePricePerNight = property.getBasePricePerNight();
        return propertyEntity;

    }
}