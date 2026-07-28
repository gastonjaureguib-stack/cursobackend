import { BookingsRepository } from '../repositories/bookings.repository.js';
import { ServicesRepository } from '../repositories/services.repository.js';

const bookingsRepository = new BookingsRepository();
const servicesRepository = new ServicesRepository();

export class BookingsService {

    async createBooking(bookingData) {
        
        const newBooking = {
            id: Date.now(),
            ...bookingData,
            services: bookingData.services || []
        };

        return await bookingsRepository.create(newBooking);
    }

    async getBookingById(id) {
        return await bookingsRepository.getById(id);
    }

    async addServiceToBooking(bid, sid) {
        
        // Validación de reserva
        const booking = await bookingsRepository.getById(bid);
        if (!booking) {
            throw new Error('Reserva no encontrada');
        }

        // Validación de servicio
        const service = await servicesRepository.getById(sid);
        if (!service) {
            throw new Error('Servicio no encontrado');
        }

        // Actualización de cantidades o inserción
        const serviceIndex = booking.services.findIndex(
            s => s.service === Number(sid)
        );

        if (serviceIndex !== -1) {
            booking.services[serviceIndex].quantity += 1;
        } else {
            booking.services.push({
                service: Number(sid),
                quantity: 1
            });
        }

        // Persistencia
        return await bookingsRepository.update(bid, booking);
    }

}