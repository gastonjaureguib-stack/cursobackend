import { BookingManager } from '../managers/BookingManager.js';
import { ServiceManager } from '../managers/ServiceManager.js';

const manager = new BookingManager('./src/data/bookings.json');
const serviceManager = new ServiceManager('./src/data/services.json');

export const createBooking = async (req, res) => {

    const {
        clientName,
        clientEmail,
        date,
        time,
        status
    } = req.body;

    if (
        !clientName ||
        !clientEmail ||
        !date ||
        !time ||
        !status
    ) {
        return res.status(400).json({
            status: 'error',
            message: 'Todos los campos son obligatorios'
        });
    }

    try {

        const newBooking = await manager.createBooking(req.body);

        res.status(201).json({
            status: 'success',
            payload: newBooking
        });

    } catch (error) {

        res.status(500).json({
            status: 'error',
            message: 'Error al crear la reserva'
        });

    }

};

export const getBookingById = async (req, res) => {

    try {

        const booking = await manager.getBookingById(req.params.bid);

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
            message: 'Error interno del servidor'
        });

    }

};

export const addServiceToBooking = async (req, res) => {

    try {

        const booking = await manager.getBookingById(req.params.bid);

        if (!booking) {

            return res.status(404).json({
                status: 'error',
                message: 'Reserva no encontrada'
            });

        }

        const service = await serviceManager.getServiceById(req.params.sid);

        if (!service) {

            return res.status(404).json({
                status: 'error',
                message: 'Servicio no encontrado'
            });

        }

        const updatedBooking = await manager.addServiceToBooking(
            req.params.bid,
            req.params.sid
        );

        res.status(200).json({
            status: 'success',
            payload: updatedBooking
        });

    } catch (error) {

        res.status(500).json({
            status: 'error',
            message: 'Error al agregar servicio'
        });

    }

};