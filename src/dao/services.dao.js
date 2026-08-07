import { ServiceModel } from '../models/service.model.js';

export class ServicesDAO {

    async getAll({ category, available, page = 1, limit = 10, sortBy = 'createdAt', order = 'asc' } = {}) {
        try {
            const filter = {};

            if (category) {
                filter.category = category;
            }

            if (available !== undefined) {
                filter.available = available === 'true' || available === true;
            }

            const pageNum = Math.max(1, parseInt(page, 10) || 1);
            const limitNum = Math.max(1, parseInt(limit, 10) || 10);
            const skip = (pageNum - 1) * limitNum;

            const sortOption = {};
            if (sortBy) {
                sortOption[sortBy] = order === 'desc' ? -1 : 1;
            }

            const [services, totalResults] = await Promise.all([
                ServiceModel.find(filter)
                    .sort(sortOption)
                    .skip(skip)
                    .limit(limitNum),
                ServiceModel.countDocuments(filter)
            ]);

            const totalPages = Math.ceil(totalResults / limitNum) || 1;

            return {
                payload: services,
                totalDocs: totalResults, 
                page: pageNum,
                limit: limitNum,
                totalPages,
                hasPrevPage: pageNum > 1,
                hasNextPage: pageNum < totalPages,
                prevPage: pageNum > 1 ? pageNum - 1 : null,
                nextPage: pageNum < totalPages ? pageNum + 1 : null
            };
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