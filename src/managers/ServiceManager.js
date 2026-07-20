import fs from 'fs/promises';

export class ServiceManager {
    constructor(filePath) {
        this.path = filePath;
    }

    // Validación de los datos del servicio
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
            if (data[field] === undefined || data[field] === null || data[field] === '') {
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
            throw new Error("El campo 'available' debe ser verdadero o falso (boolean).");
        }
    }

    async getServices() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async addService(serviceData) {
        this._validateServiceData(serviceData);

        const services = await this.getServices();

        const newService = {
            id: Date.now(),
            name: serviceData.name,
            description: serviceData.description,
            duration: serviceData.duration,
            price: serviceData.price,
            category: serviceData.category,
            available: serviceData.available
        };

        services.push(newService);

        await fs.writeFile(this.path, JSON.stringify(services, null, 2));

        return newService;
    }

    async getServiceById(id) {
        const services = await this.getServices();
        const service = services.find(service => service.id === Number(id));
        return service || null;
    }

    async updateService(id, updatedData) {
        const services = await this.getServices();

        const index = services.findIndex(service => service.id === Number(id));

        if (index === -1) {
            return null;
        }

        const updatedService = {
            ...services[index],
            ...updatedData,
            id: services[index].id
        };

        this._validateServiceData(updatedService);

        services[index] = updatedService;

        await fs.writeFile(this.path, JSON.stringify(services, null, 2));

        return updatedService;
    }

    async deleteService(id) {
        const services = await this.getServices();

        const index = services.findIndex(service => service.id === Number(id));

        if (index === -1) {
            return null;
        }

        const deletedService = services.splice(index, 1);

        await fs.writeFile(this.path, JSON.stringify(services, null, 2));

        return deletedService[0];
    }
}