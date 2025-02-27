import { Repository } from "typeorm";
import { PropertyRepository } from "../../domain/repositories/property_repository";
import { PropertyEntity } from "../persistence/entities/property_entity";
import { Property } from "../../domain/entities/property";

export class TypeORMPropertyRepository implements PropertyRepository{

    private readonly repository: Repository<PropertyEntity>;

    constructor(repository: Repository<PropertyEntity>) {
        this.repository = repository;
    }

    async save(property: Property): Promise<void> {
        
    }

    async findById(id: string): Promise<Property | null> {
       return null;
    }

}