import mongoose from 'mongoose';

const bookingCollection = 'bookings';

const bookingSchema = new mongoose.Schema({
    client: { type: String, required: true },
    clientEmail: { type: String, required: true },
    date: { type: String, required: true }, 
    time: { type: String, required: true },
    status: { type: String, required: true, default: 'pendiente' },
    services: [{
        service: { type: mongoose.Schema.Types.ObjectId, ref: 'services', required: true },
        quantity: { type: Number, required: true, default: 1 }
    }]
});

export const BookingModel = mongoose.model(bookingCollection, bookingSchema);