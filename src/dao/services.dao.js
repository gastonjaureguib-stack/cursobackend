import { ServiceModel } from '../models/service.model.js';

export class ServicesDAO {

    async getAll() {
        try {
            return await ServiceModel.find();
        } catch (error) {
            throw new Error(`Error al obtener los servicios: ${error.message}`);
        }
    }

    async getById(id) {
        try {
            return await ServiceModel.findById(id);
        } catch (error) {
            return null; 
        }
    }

    async create(service) {
        try {
            return await ServiceModel.create(service);
        } catch (error) {
            throw new Error(`Error al crear el servicio: ${error.message}`);
        }
    }

    async update(id, updatedService) {
        try {
            return await ServiceModel.findByIdAndUpdate(
                id,
                updatedService,
                { new: true, runValidators: true }
            );
        } catch (error) {
            return null;
        }
    }

    async delete(id) {
        try {
            return await ServiceModel.findByIdAndDelete(id);
        } catch (error) {
            return null;
        }
    }

}