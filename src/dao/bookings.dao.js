import fs from 'fs/promises';

export class BookingsDAO {

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

    async getAll() {
        return await this.#readFile();
    }

    async getById(id) {

        const bookings = await this.getAll();

        return bookings.find(
            booking => booking.id === Number(id)
        ) || null;

    }

    async create(newBooking) {

        const bookings = await this.getAll();

        bookings.push(newBooking);

        await fs.writeFile(
            this.path,
            JSON.stringify(bookings, null, 2)
        );

        return newBooking;

    }

    async update(id, updatedBooking) {

        const bookings = await this.getAll();

        const index = bookings.findIndex(
            booking => booking.id === Number(id)
        );

        if (index === -1) {
            return null;
        }

        bookings[index] = updatedBooking;

        await fs.writeFile(
            this.path,
            JSON.stringify(bookings, null, 2)
        );

        return updatedBooking;

    }

}