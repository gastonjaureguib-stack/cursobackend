const socket = io();

socket.on('connect', () => {
    console.log('Conectado al servidor Socket.io');
});

socket.on('update_services', (services) => {
    const servicesList = document.getElementById('services-list');

    if (!servicesList) return;

    servicesList.innerHTML = '';

    services.forEach(service => {
        const li = document.createElement('li');

        li.innerHTML = `
            <h3>${service.name}</h3>

            <p>${service.description}</p>

            <p><strong>Duración:</strong> ${service.duration} mins</p>

            <p><strong>Precio:</strong> $${service.price}</p>

            <p><strong>Categoría:</strong> ${service.category}</p>

            <p>
                <strong>Disponibilidad:</strong>
                ${service.available ? 'Disponible' : 'No disponible'}
            </p>
        `;

        servicesList.appendChild(li);
    });
});