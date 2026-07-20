import dotenv from 'dotenv';
dotenv.config();

const requiredEnv = ['PORT', 'NODE_ENV'];

requiredEnv.forEach((key) => {
    if (!process.env[key]) {
        console.error(`Error: La variable de entorno '${key}' es obligatoria.`);
        process.exit(1); 
    }
});

export const envConfig = {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV
};