Markdown# Sistema Backend de Servicios y Reservas

API REST desarrollada con **Node.js**, **Express** y **MongoDB (Mongoose)**, que permite administrar servicios turísticos y reservas.

La aplicación implementa una **arquitectura en capas** (Router → Controller → Service → Repository → DAO), facilitando el mantenimiento del código, la escalabilidad y una separación limpia de responsabilidades.

---

# Tecnologías utilizadas

- Node.js
- Express
- MongoDB & Mongoose
- dotenv

---

# Instalación

## 1. Clonar el repositorio

```bash
git clone [https://github.com/usuario/repositorio.git](https://github.com/usuario/repositorio.git)
2. Ingresar al proyectoBashcd cursoback
3. Instalar dependenciasBashnpm install
4. Crear el archivo .envTomar como referencia el archivo .env.example y completar con tus credenciales de MongoDB Atlas o local.Ejemplo:Fragmento de códigoPORT=8080
NODE_ENV=development
MONGO_URI=mongodb+srv://tu_usuario:tu_password@cluster.xxxxx.mongodb.net/tu_base_de_datos?retryWrites=true&w=majority
EjecuciónModo desarrolloBashnpm run dev
Modo producciónBashnpm start
El servidor se ejecutará por defecto en:http://localhost:8080
Arquitectura del proyectoLa aplicación fue diseñada siguiendo una arquitectura en capas, donde cada una posee una responsabilidad específica.Router
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
MongoDB (Mongoose)

Responsabilidad de cada capaCapaResponsabilidadRouterDefine los endpoints y delega el procesamiento al Controller.ControllerRecibe las solicitudes HTTP, obtiene los datos del req, invoca al Service y devuelve la respuesta (res).

ServiceContiene toda la lógica de negocio y las validaciones de la aplicación.RepositoryActúa como intermediario entre el Service y el DAO.DAOSe encarga exclusivamente de interactuar con la base de datos utilizando modelos de Mongoose.Estructura del proyectosrc/
│
├── app.js
├── server.js
│
├── config/
│   ├── env.config.js
│   └── database.config.js
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
├── models/
│   ├── service.model.js
│   └── booking.model.js
│
└── routes/
    ├── services.router.js
    └── bookings.router.js

PersistenciaLa aplicación utiliza MongoDB gestionado a través de Mongoose, reemplazando el sistema anterior de archivos JSON. Las conexiones se manejan de forma segura mediante esquemas y validaciones nativas de la base de datos

Recurso: ServicesEstructura (Modelo Mongoose)JSON{
  "name": "Tour de Montaña",
  "description": "Excursión guiada",
  "duration": 4,
  "price": 50,
  "category": "Aventura",
  "available": true
}
EndpointsMétodoEndpointDescripciónGET/api/servicesObtener todos los servicios (soporta filtros por query params: category, available, price)GET/api/services/:sidObtener un servicio por IDGET/api/services/getById/:sidObtener un servicio por ID (Ruta de compatibilidad)POST/api/servicesCrear un nuevo servicioPUT/api/services/:sidActualizar un servicioDELETE/api/services/:sidEliminar un servicioRecurso: BookingsEstructura (Modelo Mongoose)JSON{
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

EndpointsMétodoEndpointDescripciónPOST/api/bookingsCrear una reservaGET/api/bookings/:bidObtener una reserva por ID (incluye .populate() de los servicios)POST/api/bookings/:bid/services/:sidAgregar un servicio a una reserva
Regla de negocio implementadaLa lógica principal del sistema se encuentra en la capa Service.Cuando un servicio se agrega a una reserva:Si el servicio no existe en la reserva, se agrega con quantity: 1.Si el servicio ya existe, no se crea un nuevo registro, sino que se incrementa automáticamente la propiedad quantity.Esta regla de negocio se implementa en bookings.service.js, respetando la arquitectura en capas.Scripts disponiblesEjecutar en modo desarrollo:Bashnpm run dev
Ejecutar normalmente:Bashnpm start
Dependencias
express
mongoose
dotenv


AutorGastón JaureguiberryProyecto desarrollado como entrega del curso Backend con Node.js y Express de Coderhouse, implementando una API REST con arquitectura en capas, patrón Repository, patrón DAO y persistencia mediante MongoDB y Mongoose.