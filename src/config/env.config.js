import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const envConfig = {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
};

if (!envConfig.PORT) {
    console.error("❌ ERROR: La variable PORT no está definida en el archivo .env");
    console.error("Asegúrate de que el archivo .env esté en la raíz del proyecto.");
    process.exit(1);
}

console.log("✅ Variables de entorno cargadas correctamente.");