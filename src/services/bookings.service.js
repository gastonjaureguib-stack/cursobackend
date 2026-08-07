import { BookingsRepository } from '../repositories/bookings.repository.js';
import { ServicesRepository } from '../repositories/services.repository.js';

const bookingsRepository = new BookingsRepository();
const servicesRepository = new ServicesRepository();

export class BookingsService {

    async getAllBookings() {
        return await bookingsRepository.getAll();
    }

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

        // Mapeamos los servicios extrayendo únicamente el ID en caso de venir poblados (.populate)
        const services = (bookingObj.services || []).map(s => {
            const serviceId = s.service?._id ? s.service._id.toString() : s.service?.toString();
            return {
                service: serviceId,
                quantity: s.quantity || 1
            };
        });

        const serviceIndex = services.findIndex(
            s => s.service === sid.toString()
        );

        if (serviceIndex !== -1) {
            services[serviceIndex].quantity += 1;
        } else {
            services.push({
                service: sid,
                quantity: 1
            });
        }

        return await bookingsRepository.update(bid, { services });
    }
}