import fs from 'fs/promises';

export class BookingManager {

    constructor(filePath) {
        this.path = filePath;
    }


    async getBookings() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(data);

        } catch (error) {
            return [];
        }
    }


    async createBooking(bookingData) {

        const bookings = await this.getBookings();

        const newBooking = {
            id: Date.now(),
            ...bookingData,
            services: bookingData.services || []
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