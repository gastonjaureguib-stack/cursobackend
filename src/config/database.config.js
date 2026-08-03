import dns from 'dns';
import mongoose from 'mongoose';
import { envConfig } from './env.config.js';

// Node está utilizando 127.0.0.1 como DNS por defecto.
// Usamos DNS públicos para resolver correctamente MongoDB Atlas.
dns.setServers(['8.8.8.8', '1.1.1.1']);

export const connectDB = async () => {
    try {
        await mongoose.connect(envConfig.MONGO_URI);
        console.log('Base de datos conectada con éxito a MongoDB Atlas');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        process.exit(1);
    }
};