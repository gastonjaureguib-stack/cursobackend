# Sistema Backend de Servicios y Reservas para Agencia de Viajes

API REST desarrollada con **Node.js**, **Express** y **MongoDB (Mongoose)** para administrar servicios turísticos, reservas y mensajes de clientes.

La aplicación implementa una **arquitectura en capas** (Router → Controller → Service → Repository → DAO → Model), incorpora **vistas renderizadas del lado del servidor con Handlebars** y **comunicación en tiempo real mediante Socket.io**, manteniendo la API REST completamente funcional.

---

# Tecnologías utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- Express Handlebars
- Socket.io
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

Tomar como referencia el archivo `.env.example` y completar las variables de entorno.

Ejemplo:

```env
PORT=8080
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/tu_base_de_datos
```

---

# Scripts disponibles

## Modo desarrollo

```bash
npm run dev
```

## Modo producción

```bash
npm start
```

El servidor se ejecutará por defecto en:

```
http://localhost:8080
```

---

# Arquitectura del proyecto

La aplicación fue diseñada siguiendo una arquitectura en capas para separar responsabilidades y facilitar el mantenimiento del código.

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
Model (Mongoose)
   │
   ▼
MongoDB
```

## Responsabilidad de cada capa

| Capa | Responsabilidad |
|------|-----------------|
| Router | Define los endpoints y deriva las solicitudes al Controller. |
| Controller | Recibe la petición HTTP, obtiene la información del request y responde al cliente. |
| Service | Contiene la lógica de negocio y las validaciones. |
| Repository | Actúa como intermediario entre Service y DAO. |
| DAO | Gestiona el acceso a la base de datos mediante Mongoose. |
| Model | Define los esquemas y modelos de MongoDB. |

---

# Estructura del proyecto

```
src/
│
├── app.js
├── server.js
│
├── config/
│   ├── database.config.js
│   └── env.config.js
│
├── controllers/
│   ├── bookings.controller.js
│   ├── messages.controller.js
│   ├── services.controller.js
│   └── views.controller.js
│
├── services/
│   ├── bookings.service.js
│   ├── messages.service.js
│   └── services.service.js
│
├── repositories/
│   ├── bookings.repository.js
│   ├── messages.repository.js
│   └── services.repository.js
│
├── dao/
│   ├── bookings.dao.js
│   ├── messages.dao.js
│   └── services.dao.js
│
├── models/
│   ├── booking.model.js
│   ├── message.model.js
│   └── service.model.js
│
├── routes/
│   ├── bookings.router.js
│   ├── messages.router.js
│   ├── services.router.js
│   └── views.router.js
│
└── views/
    ├── layouts/
    │   └── main.handlebars
    ├── availability.handlebars
    └── services.handlebars

public/
│
├── css/
│   └── styles.css
│
└── js/
    └── socket.js
```

---

# Persistencia

La aplicación utiliza **MongoDB** administrado mediante **Mongoose**, reemplazando la persistencia basada en archivos.

Todas las operaciones sobre la base de datos se realizan respetando la arquitectura en capas.

---

# Vistas con Handlebars

La aplicación incorpora vistas renderizadas desde el servidor utilizando **Express Handlebars**.

## Servicios

```
GET /views/services
```

Renderiza el listado completo de servicios almacenados en MongoDB mostrando:

- Nombre
- Descripción
- Duración
- Precio
- Categoría
- Disponibilidad

---

## Disponibilidad / Reservas

```
GET /views/availability
```

Renderiza las reservas existentes utilizando datos reales obtenidos desde la base de datos.

---

# Comunicación en tiempo real (Socket.io)

La aplicación incorpora **Socket.io** para actualizar automáticamente la vista de servicios.

Cuando un servicio es:

- creado
- actualizado
- eliminado

el servidor emite un evento que actualiza el listado de servicios en el navegador sin necesidad de recargar la página.

---

# Recurso: Services

## Modelo

```json
{
  "name": "City Tour Montevideo",
  "description": "Recorrido guiado por la ciudad",
  "duration": 180,
  "price": 50,
  "category": "Excursiones",
  "available": true
}
```

## Endpoints

| Método | Endpoint | Descripción |
|---------|----------|-------------|
| GET | /api/services | Obtener todos los servicios |
| GET | /api/services/:sid | Obtener servicio por ID |
| POST | /api/services | Crear servicio |
| PUT | /api/services/:sid | Actualizar servicio |
| DELETE | /api/services/:sid | Eliminar servicio |

### Filtros disponibles

```
GET /api/services?category=Excursiones
```

```
GET /api/services?available=true
```

```
GET /api/services?price=50
```

---

# Recurso: Bookings

## Modelo

```json
{
  "client": "Juan Pérez",
  "clientEmail": "juan@mail.com",
  "date": "2026-07-20",
  "time": "15:00",
  "status": "pending",
  "services": [
    {
      "service": "64a2f1b8c9e4a20012345678",
      "quantity": 1
    }
  ]
}
```

## Endpoints

| Método | Endpoint | Descripción |
|---------|----------|-------------|
| POST | /api/bookings | Crear reserva |
| GET | /api/bookings/:bid | Obtener reserva por ID |
| POST | /api/bookings/:bid/services/:sid | Agregar un servicio a la reserva |

---

# Recurso: Messages

## Modelo

```json
{
  "user": "Juan Pérez",
  "message": "Quisiera información sobre las excursiones.",
  "timestamp": "2025-08-05T15:30:00.000Z"
}
```

## Endpoints

| Método | Endpoint | Descripción |
|---------|----------|-------------|
| GET | /api/messages | Obtener todos los mensajes |
| POST | /api/messages | Crear un nuevo mensaje |

---

# Regla de negocio implementada

La lógica principal se encuentra en la capa **Service**.

Cuando se agrega un servicio a una reserva:

- Si el servicio no existe, se agrega con `quantity: 1`.
- Si el servicio ya existe, se incrementa automáticamente la cantidad sin duplicar el registro.

Esta lógica se implementa respetando la arquitectura en capas.

---

# Funcionalidades implementadas

- API REST completa.
- Arquitectura en capas.
- Patrón Repository.
- Patrón DAO.
- Persistencia con MongoDB.
- Validaciones de negocio en la capa Service.
- Vistas renderizadas con Handlebars.
- Actualización en tiempo real mediante Socket.io.
- Separación entre API REST y vistas server-side.

---

# Dependencias principales

- express
- mongoose
- express-handlebars
- socket.io
- dotenv

---

# Autor

**Gastón Jaureguiberry**

Proyecto desarrollado como entrega del curso **Backend I** de **Coderhouse**, implementando una API REST con Node.js, Express y MongoDB, utilizando arquitectura en capas, patrón Repository, patrón DAO, vistas server-side con Handlebars y comunicación en tiempo real mediante Socket.io.