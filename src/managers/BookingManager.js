import fs from 'fs/promises';

export class BookingManager {

    constructor(filePath) {
        this.path = filePath;
    }

    async #readFile() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');

            if (!data.trim()) {
                return [];
            }

            return JSON.parse(data);

        } catch (error) {

            if (error.code === 'ENOENT') {
                return [];
            }

            throw new Error('El archivo de datos está corrupto o tiene un formato inválido.');
        }
    }

    #validateBookingData(data) {

        const {
            clientName,
            clientEmail,
            date,
            time,
            status,
            services
        } = data;


        if (!clientName || typeof clientName !== 'string') {
            throw new Error('El campo "clientName" es obligatorio y debe ser un texto.');
        }


        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!clientEmail || !emailRegex.test(clientEmail)) {
            throw new Error('El campo "clientEmail" debe contener un correo válido.');
        }


        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

        if (!date || !dateRegex.test(date)) {
            throw new Error('La fecha debe tener el formato YYYY-MM-DD.');
        }


        const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

        if (!time || !timeRegex.test(time)) {
            throw new Error('La hora debe tener el formato HH:MM.');
        }


        const validStatuses = [
            'pending',
            'confirmed',
            'cancelled'
        ];

        const bookingStatus = status || 'pending';

        if (!validStatuses.includes(bookingStatus)) {
            throw new Error(`El estado "${bookingStatus}" no es válido.`);
        }


        return {

            clientName: clientName.trim(),

            clientEmail: clientEmail.trim(),

            date,

            time,

            status: bookingStatus,

            services: Array.isArray(services)
                ? services
                : []

        };

    }


    async getBookings() {

        return await this.#readFile();

    }


    async createBooking(bookingData) {

        const validatedData = this.#validateBookingData(bookingData);

        const bookings = await this.getBookings();

        const newBooking = {

            id: Date.now(),

            ...validatedData

        };

        bookings.push(newBooking);

        await fs.writeFile(
            this.path,
            JSON.stringify(bookings, null, 2)
        );

        return newBooking;

    }


    async getBookingById(id) {

        const bookings = await this.getBookings();

        const booking = bookings.find(
            b => b.id === Number(id)
        );

        return booking || null;

    }


    async addServiceToBooking(bookingId, serviceId) {

        const bookings = await this.getBookings();

        const bookingIndex = bookings.findIndex(
            b => b.id === Number(bookingId)
        );

        if (bookingIndex === -1) {
            return null;
        }

        const booking = bookings[bookingIndex];

        const existingService = booking.services.find(
            s => s.service === Number(serviceId)
        );

        if (existingService) {

            existingService.quantity++;

        } else {

            booking.services.push({
                service: Number(serviceId),
                quantity: 1
            });

        }

        await fs.writeFile(
            this.path,
            JSON.stringify(bookings, null, 2)
        );

        return booking;

    }

}