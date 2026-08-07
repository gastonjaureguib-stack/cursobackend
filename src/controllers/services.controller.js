import { ServicesService } from '../services/services.service.js';

const service = new ServicesService();

export const getServices = async (req, res) => {
    try {
        const { category, available, page, limit, sortBy, order } = req.query;

        // Pasamos todos los query params a la capa de servicio/DAO
        const result = await service.getServices({
            category,
            available,
            page,
            limit,
            sortBy,
            order
        });

        // Devolvemos exactamente la estructura de metadatos requerida
        res.status(200).json({
            status: 'success',
            payload: result.payload,
            totalDocs: result.totalDocs,
            limit: result.limit,
            totalPages: result.totalPages,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevPage: result.prevPage,
            nextPage: result.nextPage
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

export const getServiceById = async (req, res) => {
    try {
        const foundService = await service.getServiceById(req.params.sid);

        if (!foundService) {
            return res.status(404).json({
                status: 'error',
                message: 'Servicio no encontrado'
            });
        }

        res.status(200).json({
            status: 'success',
            payload: foundService
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

export const createService = async (req, res) => {
    try {
        const newService = await service.createService(req.body);

        const io = req.app.get('socketio');
        if (io) {
            io.emit('update_services', await service.getServices({}));
        }

        res.status(201).json({
            status: 'success',
            payload: newService
        });

    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
};

export const updateService = async (req, res) => {
    try {
        const { id, ...updatedData } = req.body;

        const updatedService = await service.updateService(
            req.params.sid,
            updatedData
        );

        if (!updatedService) {
            return res.status(404).json({
                status: 'error',
                message: 'Servicio no encontrado'
            });
        }

        const io = req.app.get('socketio');
        if (io) {
            io.emit('update_services', await service.getServices({}));
        }

        res.status(200).json({
            status: 'success',
            payload: updatedService
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

export const deleteService = async (req, res) => {
    try {
        const deletedService = await service.deleteService(req.params.sid);

        if (!deletedService) {
            return res.status(404).json({
                status: 'error',
                message: 'Servicio no encontrado'
            });
        }

        const io = req.app.get('socketio');
        if (io) {
            io.emit('update_services', await service.getServices({}));
        }

        res.status(200).json({
            status: 'success',
            message: 'Servicio eliminado correctamente'
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};