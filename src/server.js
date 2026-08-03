import app from './app.js';
import { envConfig } from './config/env.config.js';
import { connectDB } from './config/database.config.js';

const PORT = envConfig.PORT || 8080;

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Servidor activo en el puerto ${PORT}`);
        });

    } catch (error) {
        console.error('Error al iniciar el servidor:', error.message);
        process.exit(1);
    }
};

startServer();