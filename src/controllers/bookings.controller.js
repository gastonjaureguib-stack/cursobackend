import { BookingsService } from '../services/bookings.service.js';

const service = new BookingsService();

export const getAllBookings = async (req, res) => {
    try {
        const bookings = await service.getAllBookings();

        res.status(200).json({
            status: 'success',
            payload: bookings
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

export const createBooking = async (req, res) => {
    try {
        const newBooking = await service.createBooking(req.body);

        res.status(201).json({
            status: 'success',
            payload: newBooking
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

export const getBookingById = async (req, res) => {
    try {
        const booking = await service.getBookingById(req.params.bid);

        if (!booking) {
            return res.status(404).json({
                status: 'error',
                message: 'Reserva no encontrada'
            });
        }

        res.status(200).json({
            status: 'success',
            payload: booking
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

export const addServiceToBooking = async (req, res) => {
    try {
        const updatedBooking = await service.addServiceToBooking(
            req.params.bid,
            req.params.sid
        );

        if (!updatedBooking) {
            return res.status(404).json({
                status: 'error',
                message: 'Reserva o servicio no encontrado'
            });
        }

        res.status(200).json({
            status: 'success',
            payload: updatedBooking
        });

    } catch (error) {
        if (
            error.message === 'Reserva no encontrada' ||
            error.message === 'Servicio no encontrado'
        ) {
            return res.status(404).json({
                status: 'error',
                message: error.message
            });
        }

        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};