# Agencia de Viajes - API Backend

API desarrollada en Node.js para administrar servicios turísticos utilizando FileSystem como almacenamiento persistente.

---

## Tecnologías utilizadas

- Node.js
- Express
- FileSystem (`fs/promises`)
- dotenv

---

## Instalación

1. Clonar el repositorio.

2. Instalar las dependencias:

```bash
npm install
```

3. Crear un archivo `.env` tomando como referencia `.env.example`.

---

## Variables de entorno

El proyecto requiere las siguientes variables:

```env
PORT=8080
NODE_ENV=development
```

En el repositorio únicamente se incluye `.env.example`.

---

## Ejecución

Modo desarrollo:

```bash
npm run dev
```

Modo normal:

```bash
npm start
```

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
  "category": "aventura",
  "available": true
}
```

---

# Métodos disponibles

## getServices()

Obtiene todos los servicios registrados.

### Ejemplo

```javascript
const services = await manager.getServices();
```

---

## getServiceById(id)

Obtiene un servicio según su ID.

### Ejemplo

```javascript
const service = await manager.getServiceById(1);
```

---

## addService(serviceData)

Agrega un nuevo servicio.

El ID se genera automáticamente y valida los siguientes campos obligatorios:

- name
- description
- duration
- price
- category
- available

### Ejemplo

```javascript
await manager.addService({
    name: "City Tour",
    description: "Recorrido por la ciudad",
    duration: 2,
    price: 30,
    category: "Turismo",
    available: true
});
```

---

## updateService(id, updatedData)

Actualiza un servicio existente.

No permite modificar el ID.

### Ejemplo

```javascript
await manager.updateService(1, {
    price: 40,
    available: false
});
```

---

## deleteService(id)

Elimina un servicio por su ID.

### Ejemplo

```javascript
await manager.deleteService(1);
```