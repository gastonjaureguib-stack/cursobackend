# Sistema Backend de Servicios y Reservas

API REST desarrollada con **Node.js**, **Express** y **FileSystem**, que permite administrar servicios turísticos y reservas.

La aplicación implementa una **arquitectura en capas** (Router → Controller → Service → Repository → DAO), facilitando el mantenimiento del código y permitiendo reemplazar fácilmente la capa de persistencia en futuras versiones (por ejemplo, migrando de archivos JSON a MongoDB).

---

# Tecnologías utilizadas

- Node.js
- Express
- FileSystem (`fs/promises`)
- dotenv

---

# Instalación

## 1. Clonar el repositorio

```bash
git clone https://github.com/usuario/repositorio.git
```

## 2. Ingresar al proyecto

```bash
cd cursoback
```

## 3. Instalar dependencias

```bash
npm install
```

## 4. Crear el archivo `.env`

Tomar como referencia el archivo `.env.example`.

Ejemplo:

```env
PORT=8080
NODE_ENV=development
```

---

# Ejecución

### Modo desarrollo

```bash
npm run dev
```

### Modo producción

```bash
npm start
```

El servidor se ejecutará por defecto en:

```
http://localhost:8080
```

---

# Arquitectura del proyecto

La aplicación fue refactorizada siguiendo una **arquitectura en capas**, donde cada una posee una responsabilidad específica.

```
Router
   │
   ▼
Controller
   │
   ▼
Service
   │
   ▼
Repository
   │
   ▼
DAO
   │
   ▼
Archivo JSON
```

## Responsabilidad de cada capa

| Capa | Responsabilidad |
|-------|-----------------|
| Router | Define los endpoints y delega el procesamiento al Controller. |
| Controller | Recibe las solicitudes HTTP, obtiene los datos del `req`, invoca al Service y devuelve la respuesta (`res`). |
| Service | Contiene toda la lógica de negocio y las validaciones de la aplicación. |
| Repository | Actúa como intermediario entre el Service y el DAO. |
| DAO | Se encarga exclusivamente de leer y escribir los archivos JSON. |

---

# Estructura del proyecto

```
src/
│
├── app.js
├── server.js
│
├── config/
│   └── env.config.js
│
├── controllers/
│   ├── services.controller.js
│   └── bookings.controller.js
│
├── services/
│   ├── services.service.js
│   └── bookings.service.js
│
├── repositories/
│   ├── services.repository.js
│   └── bookings.repository.js
│
├── dao/
│   ├── services.dao.js
│   └── bookings.dao.js
│
├── routes/
│   ├── services.router.js
│   └── bookings.router.js
│
└── data/
    ├── services.json
    └── bookings.json
```

---

# Persistencia

La aplicación utiliza **FileSystem** mediante la capa **DAO** para almacenar la información de forma persistente.

Archivos utilizados:

- `src/data/services.json`
- `src/data/bookings.json`

Los datos permanecen almacenados incluso después de reiniciar el servidor.

---

# Recurso: Services

## Estructura

```json
{
  "id": 1721484000000,
  "name": "Tour de Montaña",
  "description": "Excursión guiada",
  "duration": 4,
  "price": 50,
  "category": "Aventura",
  "available": true
}
```

## Endpoints

| Método | Endpoint | Descripción |
|---------|----------|-------------|
| GET | `/api/services` | Obtener todos los servicios |
| GET | `/api/services/:sid` | Obtener un servicio por ID |
| POST | `/api/services` | Crear un nuevo servicio |
| PUT | `/api/services/:sid` | Actualizar un servicio |
| DELETE | `/api/services/:sid` | Eliminar un servicio |

---

# Recurso: Bookings

## Estructura

```json
{
  "id": 1721484000000,
  "clientName": "Juan Pérez",
  "clientEmail": "juan@mail.com",
  "date": "2026-07-20",
  "time": "15:00",
  "status": "pending",
  "services": [
    {
      "service": 1721483000000,
      "quantity": 1
    }
  ]
}
```

## Endpoints

| Método | Endpoint | Descripción |
|---------|----------|-------------|
| POST | `/api/bookings` | Crear una reserva |
| GET | `/api/bookings/:bid` | Obtener una reserva por ID |
| POST | `/api/bookings/:bid/services/:sid` | Agregar un servicio a una reserva |

---

# Regla de negocio implementada

La lógica principal del sistema se encuentra en la capa **Service**.

Cuando un servicio se agrega a una reserva:

- Si el servicio **no existe** en la reserva, se agrega con `quantity: 1`.
- Si el servicio **ya existe**, **no se crea un nuevo registro**, sino que se incrementa automáticamente la propiedad `quantity`.

Esta regla de negocio se implementa en `bookings.service.js`, respetando la arquitectura en capas.

---

# Scripts disponibles

Ejecutar en modo desarrollo:

```bash
npm run dev
```

Ejecutar normalmente:

```bash
npm start
```

---

# Dependencias

- express
- dotenv

---

# Autor

**Gastón Jaureguiberry**

Proyecto desarrollado como entrega del curso **Backend con Node.js y Express** de **Coderhouse**, implementando una API REST con arquitectura en capas, patrón Repository, patrón DAO y persistencia mediante FileSystem.