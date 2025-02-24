import { DateRange } from './../../domain/value_objects/date_range';
import { Booking } from "../../domain/entities/booking";
import { BookingRepository } from "../../domain/repositories/booking_repository";
import { CreateBookingDTO } from "../dtos/create_booking_dto";
import { PropertyService } from "./property_service";
import { UserService } from "./user_service";
import { v4 as uuid } from 'uuid';

export class BookingService {

    constructor(
        private readonly bookingRepository: BookingRepository,
        private readonly propertyService: PropertyService,
        private readonly userService: UserService
    ){}


    /**
     * Ja havia feito o testo da propriedade e do usuario, agora preciso fazer o teste do booking
     * utilizei os mocks para evitar a dependencia de outras classes e somente me concentrar na classe que estou testando que 
     * é a BookingService
     */



    async createBooking(dto: CreateBookingDTO): Promise<Booking> {
        const property = await this.propertyService.findPropertyById(dto.propertyId);

       if(!property){
        throw new Error('Propriedade não encontrada');
       }

       const guest = await this.userService.findUserById(dto.guestId);
       if(!guest){
        throw new Error('Usuario não encontrado');
       }

       const dateRange = new DateRange(dto.startDate, dto.endDate); // altamento acoplado precisa de mock para ser usado

       const booking = new Booking(
        uuid(),
        property,
        guest,
        dateRange,
        dto.guestCount
       )

       await this.bookingRepository.save(booking);
       return booking;
    }

    async cancelBooking(bookingId: string): Promise<void> {
        const booking = await this.bookingRepository.findById(bookingId);
        booking?.cancel(new Date());
        await this.bookingRepository.save(booking!);
    }
}
   