import { DateRange } from "../value_objects/date_range";
import { Booking } from "./booking";

export class Property {
    private readonly id: string;
    private readonly name: string;
    private readonly description: string;
    private readonly maxGuests: number;
    private readonly basePricePerNight: number;
    private readonly bookings: Booking[] = [];
  constructor(id: string,name: string,description: string,maxGuests: number,basePricePerNight: number) {
    if(!name){
        throw new Error('Nome da propriedade deve ser preenchido');
    }
    if (maxGuests <= 0) {
      throw new Error('Numero de hospedes deve ser maior que 0');
    }
    if (basePricePerNight <= 0) {
        throw new Error('O preço base por noite é obrigatório.');
    }
    this.id = id;
    this.name = name;
    this.description = description;
    this.maxGuests = maxGuests;
    this.basePricePerNight = basePricePerNight;
  }

    getId(): string {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getDescription(): string {
        return this.description;
    }

    getMaxGuests(): number {
        return this.maxGuests;
    }

    getBasePricePerNight(): number {
        return this.basePricePerNight;
    }

    validateGuestCount(guests: number): void {
        if (guests > this.maxGuests) {
            throw new Error('Numero de hospedes excede o limite da propriedade');
        }
    }

    calculateTotalPrice(dateRange: DateRange): number {
        const totalNight = dateRange.getTotalNights();
        let totalPrice = totalNight * this.basePricePerNight;
        if (totalNight >= 7) {
            totalPrice = totalPrice * 0.9
        }
        return totalPrice
    }

    isAvailable(dateRange: DateRange): boolean {
        return !this.bookings.some((booking) => booking.getStatus() === 'CONFIRMED' && booking.getDateRange().overlaps(dateRange));
    }

    addBooking(booking: Booking): void {
        this.bookings.push(booking);
    }

    getBooking(): Booking[] {
        return [...this.bookings];
    }
}