# Agencia de Viajes - Sistema Backend de Reservas

## Descripción
Este proyecto es un sistema de backend diseñado para gestionar el catálogo de servicios de una agencia de viajes. Permite administrar tours y paquetes turísticos mediante operaciones CRUD (Crear, Leer, Actualizar, Borrar).

## Instalación
1. Clonar el repositorio.
2. Ejecutar `npm install` para instalar `dotenv`.
3. Crear un archivo `.env` en la raíz basándote en `.env.example`.

## Cómo ejecutar
- Modo desarrollo (con recarga automática): `npm run dev`
- Modo producción: `npm start`

## Variables de Entorno
- `PORT`: Puerto en el que correrá el servidor.
- `NODE_ENV`: Entorno de ejecución (development/production).

## Ejemplo de uso
```javascript
const manager = new ServiceManager('./data/services.json');
await manager.addService({
    name: "Crucero por el Caribe",
    description: "7 días de lujo",
    duration: 7,
    price: 1200,
    category: "Cruceros",
    available: true
});