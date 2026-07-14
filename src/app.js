import { ServiceManager } from './managers/ServiceManager.js';
import path from 'path';
import { fileURLToPath } from 'url';


const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rutaDeDatos = path.join(__dirname, './data/services.json');


const manager = new ServiceManager(rutaDeDatos);


const test = async () => {
    console.log("Agregando servicio de viaje...");
    
   
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