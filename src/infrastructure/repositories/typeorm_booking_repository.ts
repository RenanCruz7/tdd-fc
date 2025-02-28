import { Repository } from "typeorm";
import { Booking } from "../../domain/entities/booking";
import { BookingRepository } from "../../domain/repositories/booking_repository";
import { BookingEntity } from "../persistence/entities/booking_entity";

export class TypeORMBookingRepository implements BookingRepository{
    
    private readonly repository:  Repository<BookingEntity>;

    constructor(repository: Repository<BookingEntity>) {
        this.repository = repository;
    }

    async save(): Promise<void> {
        
    }

    async findById(): Promise<Booking | null> {
        return null;
    }
}