import { BookingsDAO } from '../dao/bookings.dao.js';

const dao = new BookingsDAO('./src/data/bookings.json');

export class BookingsRepository {

    async create(data) {
        return await dao.create(data);
    }

    async getById(id) {
        return await dao.getById(id);
    }

    async update(id, booking) {
        return await dao.update(id, booking);
    }

    async getAll() {
        return await dao.getAll();
    }

}