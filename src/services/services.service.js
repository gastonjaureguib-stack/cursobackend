import { ServicesRepository } from '../repositories/services.repository.js';

const repository = new ServicesRepository();

export class ServicesService {

    async getServices(queryParams) {
        return await repository.getAll(queryParams);
    }

    async getServiceById(id) {
        return await repository.getById(id);
    }

    async createService(serviceData) {
        return await repository.create(serviceData);
    }

    async updateService(id, updatedData) {
        const existingService = await repository.getById(id);

        if (!existingService) {
            return null;
        }

        return await repository.update(id, updatedData);
    }

    async deleteService(id) {
        return await repository.delete(id);
    }
}