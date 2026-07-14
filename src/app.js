import { ServiceManager } from './managers/ServiceManager.js';
import path from 'path';
import { fileURLToPath } from 'url';

// 1. Preparamos la ruta del archivo
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rutaDeDatos = path.join(__dirname, './data/services.json');

// 2. Instanciamos el manager (AQUÍ ESTÁ LA VARIABLE QUE TE FALTABA)
const manager = new ServiceManager(rutaDeDatos);

// 3. Ejecutamos nuestra prueba
const test = async () => {
    console.log("Agregando servicio de viaje...");
    
    // Ahora 'manager' ya existe aquí porque está en el mismo archivo
    await manager.addService({ 
        name: "Tour por Europa", 
        description: "Recorrido por París, Roma y Madrid", 
        duration: 15, 
        price: 2500, 
        category: "Tours Internacionales", 
        available: true 
    });
    
    const servicios = await manager.getServices();
    console.log("Servicios de viaje actuales:", servicios);
};

test();