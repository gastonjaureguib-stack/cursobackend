import { ServicesService } from '../services/services.service.js';
import { BookingsService } from '../services/bookings.service.js';

const servicesService = new ServicesService();
const bookingsService = new BookingsService();

export const renderServicesView = async (req, res) => {
    try {
        const services = await servicesService.getServices();

        const servicesPlain = services.map(service =>
            service.toObject ? service.toObject() : service
        );

        res.render('services', {
            title: 'Listado de Servicios',
            services: servicesPlain
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

export const renderAvailabilityView = async (req, res) => {
    try {
        const bookings = await bookingsService.getBookings();

        const bookingsPlain = bookings.map(booking =>
            booking.toObject ? booking.toObject() : booking
        );

        res.render('availability', {
            title: 'Disponibilidad y Reservas',
            bookings: bookingsPlain
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};