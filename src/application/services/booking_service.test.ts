import { FakeBookingRepository } from './../../infrastructure/repositories/fake_booking_repository';
import { CreateBookingDTO } from './../dtos/create_booking_dto';
import { Booking } from '../../domain/entities/booking';
import { BookingService } from './booking_service';
import { UserService } from './user_service';
import { PropertyService } from './property_service';

jest.mock('./property_service');
jest.mock('./user_service');

describe('BookingService', () => {	
    let bookingService: BookingService;
    let fakeBookingRepository: FakeBookingRepository;
    let mockPropertyService: jest.Mocked<PropertyService>;
    let mockUserService: jest.Mocked<UserService>;

    beforeEach(() => {
        const mockPropertyRepository = {} as any;
        const mockUserRepository = {} as any;

        mockPropertyService = new PropertyService(mockPropertyRepository) as jest.Mocked<PropertyService>;
        mockUserService = new UserService(mockUserRepository) as jest.Mocked<UserService>;

        fakeBookingRepository = new FakeBookingRepository();

        bookingService = new BookingService(fakeBookingRepository, mockPropertyService, mockUserService);
    });


    it('Deve criar um booking com sucesso utilizando o repository fake', async () => {
        // Mocks de property e user
        const mockProperty = {
            getId: jest.fn().mockReturnValue('1'),
            isAvailable: jest.fn().mockReturnValue(true),
            validateGuestCount: jest.fn(), // Corrigido aqui
            calculateTotalPrice: jest.fn().mockReturnValue(500),
            addBooking: jest.fn()
        } as any;

        const mockUser = {
            getId: jest.fn().mockReturnValue('1')
        } as any;

        // Busca dos resultados de property e user
        mockPropertyService.findPropertyById.mockResolvedValue(mockProperty);
        mockUserService.findUserById.mockResolvedValue(mockUser);

        const bookingDTO: CreateBookingDTO = {
            propertyId: '1',
            guestId: '1',
            startDate: new Date('2021-10-10'),
            endDate: new Date('2021-10-15'),
            guestCount: 2
        }

        const result = await bookingService.createBooking(bookingDTO);

        expect(result).toBeInstanceOf(Booking);
        expect(result.getStatus()).toBe('CONFIRMED');
        expect(result.getTotalPrice()).toBe(500);


        const savedBooking = await fakeBookingRepository.findById(result.getId());  
        expect(savedBooking).not.toBeNull();
        expect(savedBooking?.getId()).toBe(result.getId());
    });
});