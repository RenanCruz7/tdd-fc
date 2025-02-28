import { Booking } from "../../domain/entities/booking";
import { BookingRepository } from "../../domain/repositories/booking_repository";

export class TypeORMBookingRepository implements BookingRepository{
    
    constructor() {
        
    }

    async save(): Promise<void> {
        
    }

    async findById(): Promise<Booking | null> {
        return null;
    }
}