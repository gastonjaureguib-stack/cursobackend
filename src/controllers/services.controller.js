import { ServicesService } from '../services/services.service.js';

const service = new ServicesService();

export const getServices = async (req, res) => {
    try {

        const { category, available, price } = req.query;

        let services = await service.getServices();

        if (category) {
            services = services.filter(s => s.category === category);
        }

        if (available !== undefined) {
            services = services.filter(
                s => s.available === (available === 'true')
            );
        }

        if (price !== undefined) {
            const numericPrice = Number(price);
            services = services.filter(s => s.price === numericPrice);
        }

        res.status(200).json({
            status: 'success',
            payload: services
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