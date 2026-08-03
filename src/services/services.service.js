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
            if (data[field] === undefined || data[field] === null) {
                throw new Error(`El campo '${field}' es obligatorio.`);
            }

            if (
                typeof data[field] === 'string' &&
                data[field].trim() === ''
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

        if (data.duration <= 0) {
            throw new Error("La duración debe ser mayor que cero.");
        }

        if (typeof data.price !== 'number') {
            throw new Error("El campo 'price' debe ser un número.");
        }

        if (data.price < 0) {
            throw new Error("El precio no puede ser negativo.");
        }

        if (typeof data.category !== 'string') {
            throw new Error("El campo 'category' debe ser un texto.");
        }

        if (typeof data.available !== 'boolean') {
            throw new Error("El campo 'available' debe ser un valor booleano.");
        }
    }

    async getServices() {
        return repository.getAll();
    }

    async getServiceById(id) {
        return repository.getById(id);
    }

    async createService(serviceData) {
        this._validateServiceData(serviceData);
        
        return repository.create(serviceData);
    }

    async updateService(id, updatedData) {
        const service = await repository.getById(id);

        if (!service) {
            return null;
        }

        
        const serviceObj = service.toObject ? service.toObject() : service;

        const updatedService = {
            ...serviceObj,
            ...updatedData
        };

        this._validateServiceData(updatedService);

        return repository.update(id, updatedData);
    }

    async deleteService(id) {
        return repository.delete(id);
    }
}