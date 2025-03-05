import { Booking } from "../../../domain/entities/booking";
import { Property } from "../../../domain/entities/property";
import { DateRange } from "../../../domain/value_objects/date_range";
import { BookingEntity } from "../entities/booking_entity";
import { PropertyMapper } from "./property_mapper";
import { UserMapper } from "./user_mapper";

export class BookingMapper {

    static toDomain(entity: BookingEntity, property?: Property): Booking {
        const guest = UserMapper.toDomain(entity.guest);
        const dateRange = new DateRange(entity.startDate, entity.endDate);

        const booking = new Booking(
            entity.id,
            property || PropertyMapper.toDomain(entity.property),
            guest,
            dateRange,
            entity.guestCount,
        )

        booking['status'] = entity.status;
        booking['totalPrice'] = entity.totalPrice;

        return booking;
    }


    static toPersistence(domain: Booking): BookingEntity {
        const entity = new BookingEntity();
        entity.id = domain.getId();
        entity.guest = UserMapper.toPersistence(domain.getUser());
        entity.property = PropertyMapper.toPersistence(domain.getProperty());
        entity.startDate = domain.getDateRange().getStartDate();
        entity.endDate = domain.getDateRange().getEndDate();
        entity.guestCount = domain.getGuestCount();
        entity.status = domain.getStatus();
        entity.totalPrice = domain.getTotalPrice();

        return entity;
    }

}