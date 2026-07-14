import fs from 'fs/promises';
import path from 'path';

export class ServiceManager {
    constructor(filePath) {
        this.path = filePath;
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
        const services = await this.getServices();
        const newService = {
            id: Date.now(),
            ...serviceData
        };
        services.push(newService);
        await fs.writeFile(this.path, JSON.stringify(services, null, 2));
        return newService;
    }

    
    async getServiceById(id) {
        const services = await this.getServices();
        const service = services.find(s => s.id === Number(id));
        return service || null;
    }

    async updateService(id, updatedData) {
        let services = await this.getServices();
        const index = services.findIndex(s => s.id === Number(id));
        if (index === -1) return null;

        services[index] = { ...services[index], ...updatedData, id: services[index].id };
        await fs.writeFile(this.path, JSON.stringify(services, null, 2));
        return services[index];
    }

    async deleteService(id) {
        let services = await this.getServices();
        const index = services.findIndex(s => s.id === Number(id));
        if (index === -1) return null;

        const deletedService = services.splice(index, 1);
        await fs.writeFile(this.path, JSON.stringify(services, null, 2));
        return deletedService[0];
    }
} 