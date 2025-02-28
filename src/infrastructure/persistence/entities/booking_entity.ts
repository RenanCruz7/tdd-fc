import { Entity, PrimaryColumn } from "typeorm";

@Entity('bookings')
export class BookingEntity{
    
    @PrimaryColumn('uuid')
    id!: string;

    
}