# Sistema Backend de Servicios y Reservas

API REST desarrollada con **Node.js**, **Express** y **FileSystem** para administrar servicios turísticos y reservas. La información se almacena de forma persistente en archivos JSON, por lo que los datos se conservan aunque el servidor se reinicie.

---

# Tecnologías utilizadas

- Node.js
- Express
- FileSystem (`fs/promises`)
- dotenv

---

# Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/usuario/repositorio.git
```

2. Ingresar al proyecto:

```bash
cd cursoback
```

3. Instalar las dependencias:

```bash
npm install
```

4. Crear un archivo `.env` tomando como referencia `.env.example`.

---

# Variables de entorno

El proyecto requiere las siguientes variables:

```env
PORT=8080
NODE_ENV=development
```

En el repositorio se incluye un archivo `.env.example` como referencia.

---

# Ejecución

Modo desarrollo:

```bash
npm run dev
```

Modo producción:

```bash
npm start
```

Por defecto el servidor se ejecuta en:

```
http://localhost:8080
```

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
├── data/
│   ├── services.json
│   └── bookings.json
│
├── managers/
│   ├── ServiceManager.js
│   └── BookingManager.js
│
└── routes/
    ├── services.router.js
    └── bookings.router.js
```

---

# Persistencia

La aplicación utiliza **FileSystem** para almacenar la información en archivos JSON.

Archivos utilizados:

- `src/data/services.json`
- `src/data/bookings.json`

Los datos permanecen almacenados incluso después de reiniciar el servidor.

---

# Recurso: Services

Cada servicio posee la siguiente estructura:

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

### Obtener todos los servicios

```
GET /api/services
```

Devuelve todos los servicios registrados.

---

### Obtener un servicio por ID

```
GET /api/services/:sid
```

Devuelve un servicio específico.

---

### Crear un servicio

```
POST /api/services
```

Campos requeridos:

- name
- description
- duration
- price
- category
- available

El ID se genera automáticamente.

---

### Actualizar un servicio

```
PUT /api/services/:sid
```

Actualiza un servicio existente.

**El ID no puede modificarse.**

---

### Eliminar un servicio

```
DELETE /api/services/:sid
```

Elimina un servicio existente.

---

# Recurso: Bookings

Cada reserva posee la siguiente estructura:

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

---

## Endpoints

### Crear una reserva

```
POST /api/bookings
```

Crea una nueva reserva.

Puede iniciarse con el arreglo `services` vacío.

---

### Obtener una reserva por ID

```
GET /api/bookings/:bid
```

Devuelve una reserva específica.

---

### Agregar un servicio a una reserva

```
POST /api/bookings/:bid/services/:sid
```

Agrega un servicio existente a una reserva existente.

Si el mismo servicio se agrega nuevamente, no se crea un nuevo registro; simplemente se incrementa la propiedad `quantity`.

---

# Validaciones implementadas

La API valida:

- Campos obligatorios.
- Tipos de datos.
- Formato válido del correo electrónico.
- Formato de fecha.
- Formato de hora.
- Estados permitidos para una reserva.
- El ID se genera automáticamente.
- El ID no puede modificarse durante una actualización.

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

Proyecto desarrollado como entrega para el curso de **Backend con Node.js y Express**, implementando una API REST con persistencia mediante FileSystem.