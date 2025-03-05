import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('bookings')
export class BookingEntity{
    
    @PrimaryColumn('uuid')
    id!: string;

    @Column()
    startDate!: Date;

    @Column()
    endDate!: Date;

    @Column()
    guestCount!: number;

    @Column()
    status!: 'CONFIRMED' | 'CANCELLED';

    @Column()
    totalPrice!: number;
}