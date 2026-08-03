import { BookingsRepository } from '../repositories/bookings.repository.js';
import { ServicesRepository } from '../repositories/services.repository.js';

const bookingsRepository = new BookingsRepository();
const servicesRepository = new ServicesRepository();

export class BookingsService {

    async createBooking(bookingData) {
        const newBooking = {
            ...bookingData,
            services: bookingData.services || []
        };

        return await bookingsRepository.create(newBooking);
    }

    async getBookingById(id) {
        return await bookingsRepository.getById(id);
    }

    async addServiceToBooking(bid, sid) {

        const booking = await bookingsRepository.getById(bid);

        if (!booking) {
            throw new Error('Reserva no encontrada');
        }

        const service = await servicesRepository.getById(sid);

        if (!service) {
            throw new Error('Servicio no encontrado');
        }

        const bookingObj = booking.toObject ? booking.toObject() : booking;

        const serviceIndex = bookingObj.services.findIndex(
            s => s.service.toString() === sid.toString()
        );

        if (serviceIndex !== -1) {
            bookingObj.services[serviceIndex].quantity += 1;
        } else {
            bookingObj.services.push({
                service: sid,
                quantity: 1
            });
        }

        return await bookingsRepository.update(bid, {
            services: bookingObj.services
        });
    }

}