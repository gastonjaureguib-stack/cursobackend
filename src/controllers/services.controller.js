import { ServiceManager } from '../managers/ServiceManager.js';

const manager = new ServiceManager('./src/data/services.json');

export const getServices = async (req, res) => {
    try {
        const { category, available } = req.query;
        let services = await manager.getServices();

        if (category) {
            services = services.filter(s => s.category === category);
        }

        if (available !== undefined) {
            services = services.filter(
                s => s.available === (available === 'true')
            );
        }

        res.status(200).json({
            status: 'success',
            payload: services
        });

    } catch (error) {

        res.status(500).json({
            status: 'error',
            message: 'Error interno del servidor'
        });

    }
};

export const getServiceById = async (req, res) => {

    try {

        const service = await manager.getServiceById(req.params.sid);

        if (!service) {
            return res.status(404).json({
                status: 'error',
                message: 'Servicio no encontrado'
            });
        }

        res.status(200).json({
            status: 'success',
            payload: service
        });

    } catch (error) {

        res.status(500).json({
            status: 'error',
            message: 'Error interno del servidor'
        });

    }

};

export const createService = async (req, res) => {

    try {

        const newService = await manager.addService(req.body);

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

        const updated = await manager.updateService(
            req.params.sid,
            updatedData
        );

        if (!updated) {
            return res.status(404).json({
                status: 'error',
                message: 'Servicio no encontrado'
            });
        }

        res.status(200).json({
            status: 'success',
            payload: updated
        });

    } catch (error) {

        res.status(500).json({
            status: 'error',
            message: 'Error al actualizar el servicio'
        });

    }

};

export const deleteService = async (req, res) => {

    try {

        const deleted = await manager.deleteService(req.params.sid);

        if (!deleted) {
            return res.status(404).json({
                status: 'error',
                message: 'Servicio no encontrado'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Servicio eliminado correctamente'
        });

    } catch (error) {

        res.status(500).json({
            status: 'error',
            message: 'Error al eliminar el servicio'
        });

    }

};