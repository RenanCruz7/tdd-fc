import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { BookingEntity } from "./booking_entity";

@Entity('properties')
export class PropertyEntity {
   @PrimaryColumn('uuid')
    id!: string;

    @Column()
    name!: string;

    @Column()
    description!: string;

    @Column()
    maxGuests!: number;

    @Column()
    basePricePerNight!: number;


    @OneToMany(() => BookingEntity, (booking) => booking.property)
    bookings!: BookingEntity[];
}