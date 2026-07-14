import { Router } from 'express';
import { ServiceManager } from '../managers/ServiceManager.js';

const router = Router();
const manager = new ServiceManager('./src/data/services.json');

router.get('/', async (req, res) => {
    try {
        const { category, available } = req.query;
        let services = await manager.getServices();

        if (category) {
            services = services.filter(s => s.category === category);
        }
        if (available !== undefined) {
           
            services = services.filter(s => s.available === (available === 'true'));
        }

        res.status(200).json({ status: 'success', payload: services });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
    }
});

// GET /api/services/:sid
router.get('/:sid', async (req, res) => {
    const service = await manager.getServiceById(req.params.sid);
    if (!service) return res.status(404).json({ status: 'error', message: 'Servicio no encontrado' });
    res.status(200).json({ status: 'success', payload: service });
});

// POST /api/services
router.post('/', async (req, res) => {
    const { name, duration, price, category } = req.body;
    
    // Validación básica
    if (!name || !duration || !price || !category) {
        return res.status(400).json({ status: 'error', message: 'Faltan campos obligatorios' });
    }

    try {
        const newService = await manager.addService(req.body);
        res.status(201).json({ status: 'success', payload: newService });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error al guardar el servicio' });
    }
});

// PUT /api/services/:sid
router.put('/:sid', async (req, res) => {
    const updated = await manager.updateService(req.params.sid, req.body);
    if (!updated) return res.status(404).json({ status: 'error', message: 'Servicio no encontrado' });
    res.status(200).json({ status: 'success', payload: updated });
});

// DELETE /api/services/:sid
router.delete('/:sid', async (req, res) => {
    const deleted = await manager.deleteService(req.params.sid);
    if (!deleted) return res.status(404).json({ status: 'error', message: 'Servicio no encontrado' });
    res.status(200).json({ status: 'success', message: 'Servicio eliminado correctamente' });
});

export default router;