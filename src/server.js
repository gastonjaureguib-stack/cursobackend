import http from 'http';
import { Server } from 'socket.io';
import app from './app.js';
import { envConfig } from './config/env.config.js';
import { connectDB } from './config/database.config.js';

const PORT = envConfig.PORT || 8080;

const server = http.createServer(app);
const io = new Server(server);

app.set('socketio', io);

io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado:', socket.id);

    socket.on('disconnect', () => {
        console.log('Cliente desconectado:', socket.id);
    });
});

const startServer = async () => {
    try {
        await connectDB();

        server.listen(PORT, () => {
            console.log(`Servidor activo en el puerto ${PORT}`);
        });

    } catch (error) {
        console.error('Error al iniciar el servidor:', error.message);
        process.exit(1);
    }
};

startServer();