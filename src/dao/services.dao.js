import fs from 'fs/promises';

export class ServicesDAO {

    constructor(filePath) {
        this.path = filePath;
    }

    async getAll() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async getById(id) {
        const services = await this.getAll();
        return services.find(service => service.id === Number(id)) || null;
    }

    async create(service) {
        const services = await this.getAll();

        services.push(service);

        await fs.writeFile(
            this.path,
            JSON.stringify(services, null, 2)
        );

        return service;
    }

    async update(id, updatedService) {
        const services = await this.getAll();

        const index = services.findIndex(
            service => service.id === Number(id)
        );

        if (index === -1) {
            return null;
        }

        services[index] = updatedService;

        await fs.writeFile(
            this.path,
            JSON.stringify(services, null, 2)
        );

        return updatedService;
    }

    async delete(id) {
        const services = await this.getAll();

        const index = services.findIndex(
            service => service.id === Number(id)
        );

        if (index === -1) {
            return null;
        }

        const deleted = services.splice(index, 1);

        await fs.writeFile(
            this.path,
            JSON.stringify(services, null, 2)
        );

        return deleted[0];
    }

}