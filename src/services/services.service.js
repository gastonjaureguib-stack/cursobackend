import { ServicesRepository } from '../repositories/services.repository.js';

const repository = new ServicesRepository();

export class ServicesService {

    _validateServiceData(data) {

        const requiredFields = [
            'name',
            'description',
            'duration',
            'price',
            'category',
            'available'
        ];

        for (const field of requiredFields) {
            if (
                data[field] === undefined ||
                data[field] === null ||
                data[field] === ''
            ) {
                throw new Error(`El campo '${field}' es obligatorio.`);
            }
        }

        if (typeof data.name !== 'string') {
            throw new Error("El campo 'name' debe ser un texto.");
        }

        if (typeof data.description !== 'string') {
            throw new Error("El campo 'description' debe ser un texto.");
        }

        if (typeof data.duration !== 'number') {
            throw new Error("El campo 'duration' debe ser un número.");
        }

        if (typeof data.price !== 'number') {
            throw new Error("El campo 'price' debe ser un número.");
        }

        if (typeof data.category !== 'string') {
            throw new Error("El campo 'category' debe ser un texto.");
        }

        if (typeof data.available !== 'boolean') {
            throw new Error("El campo 'available' debe ser boolean.");
        }

    }

    async getServices() {
        return await repository.getAll();
    }

    async getServiceById(id) {
        return await repository.getById(id);
    }

    async createService(serviceData) {

        this._validateServiceData(serviceData);

        const newService = {
            id: Date.now(),
            ...serviceData
        };

        return await repository.create(newService);

    }

    async updateService(id, updatedData) {

        const service = await repository.getById(id);

        if (!service) {
            return null;
        }

        const updatedService = {
            ...service,
            ...updatedData,
            id: service.id
        };

        this._validateServiceData(updatedService);

        return await repository.update(id, updatedService);

    }

    async deleteService(id) {
        return await repository.delete(id);
    }

}