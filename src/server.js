import app from './app.js';
import { envConfig } from './config/env.config.js';

const PORT = envConfig.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Servidor activo en el puerto ${PORT}`);
});