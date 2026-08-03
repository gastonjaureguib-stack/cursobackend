import { BookingModel } from '../models/booking.model.js';

export class BookingsDAO {

    async getAll() {
        try {
            return await BookingModel.find().populate('services.service');
        } catch (error) {
            throw new Error(`Error al obtener las reservas: ${error.message}`);
        }
    }

    async getById(id) {
        try {
            return await BookingModel.findById(id).populate('services.service');
        } catch (error) {
            return null; // Si el ID no es un ObjectId válido o no existe
        }
    }

    async create(newBooking) {
        try {
            const booking = await BookingModel.create(newBooking);
            return await booking.populate('services.service');
        } catch (error) {
            throw new Error(`Error al crear la reserva: ${error.message}`);
        }
    }

    async update(id, updatedBooking) {
        try {
            const booking = await BookingModel.findByIdAndUpdate(
                id,
                updatedBooking,
                { new: true, runValidators: true }
            ).populate('services.service');

            return booking;
        } catch (error) {
            return null;
        }
    }

}