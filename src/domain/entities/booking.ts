import { FullRefund } from '../cancelation/full_refund';
import { PartialRefund } from '../cancelation/partial_refund';
import { RefundRuleFactory } from '../cancelation/refund_rule_factory';
import { DateRange } from './../value_objects/date_range';
import { Property } from "./property";
import { User } from "./user";

export class Booking {
    private readonly id: string;
    private readonly property: Property;
    private readonly guest: User;
    private readonly DateRange: DateRange;
    private readonly guestCount: number
    private status: 'CONFIRMED' | 'CANCELLED' = 'CONFIRMED';
    private totalPrice: number;
    constructor(
        id: string,
        property: Property,
        guest: User,
        DateRange: DateRange,
        guestCount: number
    ) {
        if (guestCount <= 0) {
            throw new Error('Numero de hospedes deve ser maior que 0');
        }
        property.validateGuestCount(guestCount);

        if (!property.isAvailable(DateRange)) {
            throw new Error('Propriedade não disponível para o período solicitado');
        }

        this.id = id;
        this.property = property;
        this.guest = guest;
        this.DateRange = DateRange;
        this.guestCount = guestCount;
        this.totalPrice = property.calculateTotalPrice(DateRange);
        this.status = 'CONFIRMED';

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

    cancel(currentDate: Date): void {
        if (this.status === 'CANCELLED') {
            throw new Error('Reserva já esta cancelada');
        }
        
        const checkInDate = this.DateRange.getStartDate();
        const timeDiff = checkInDate.getTime() - currentDate.getTime();
        const daysUntilCheckIn = Math.ceil(timeDiff / (1000 * 3600 * 24));
        
        const refundRule = RefundRuleFactory.getRefundRule(daysUntilCheckIn);
        this.totalPrice = refundRule.calculateRefund(this.totalPrice);
        this.status = 'CANCELLED';
    }
}