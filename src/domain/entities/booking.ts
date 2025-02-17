import { DateRange } from './../value_objects/date_range';
import { Property } from "./property";
import { User } from "./user";

export class Booking {
    private readonly id: string;
    private readonly property: Property;
    private readonly guest: User;
    private readonly DateRange: DateRange;
    private readonly guestCount: number
    private readonly status: 'CONFIRMED' | 'CANCELLED' = 'CONFIRMED';
    private readonly totalPrice: number;
    constructor(
        id: string,
        property: Property,
        guest: User,
        DateRange: DateRange,
        guestCount: number
    ){
        if(guestCount <= 0){
            throw new Error('Numero de hospedes deve ser maior que 0');
        }
        property.validateGuestCount(guestCount);

        this.id = id;
        this.property = property;
        this.guest = guest;
        this.DateRange = DateRange;
        this.guestCount = guestCount;
        this.totalPrice = property.calculateTotalPrice(DateRange);

        property.addBooking(this);
    }

    getId(): string {
        return this.id;
    }
    getProperty(): Property {      
        return this.property;
    }

    getUser(): User {
        return this.guest;
    }
    getDateRange(): DateRange {
        return this.DateRange;
    }

    getGuestCount(): number {
        return this.guestCount;
    }

    getStatus(): 'CONFIRMED' | 'CANCELLED' {
        return this.status;
    }

    getTotalPrice(): number {
        return this.totalPrice;
    }
}