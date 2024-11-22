// Manejar el menú lateral
document.getElementById("menu-btn").addEventListener("click", () => {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("active");
});

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita el envío por defecto
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (!username || !password) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        // Simulación de verificación de credenciales
        const correctUsername = 'admin';
        const correctPassword = '1234';

        if (username === correctUsername && password === correctPassword) {
            alert('Inicio de sesión exitoso');
            // Redirigir o actualizar la interfaz según sea necesario
            showSection("contenedores");
        } else {
            alert('Credenciales incorrectas');
        }
    });

    // Agregar evento de clic al icono del camión
    const truckIcon = document.getElementById('truck-icon');
    truckIcon.addEventListener('click', () => {
        showSection('sensores');
    });

    // Agregar evento de clic a todos los contenedores
    const containers = document.querySelectorAll('.container');
    containers.forEach(container => {
        container.addEventListener('click', () => {
            showSection('sensores');
        });
    });
});

function showSection(sectionId) {
    // Ocultar todas las secciones
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Mostrar la sección seleccionada
    const sectionToShow = document.getElementById(sectionId);
    if (sectionToShow) {
        sectionToShow.classList.add('active');
    }
}

// Agregar evento al hacer clic en un contenedor
document.querySelectorAll('.contenedor-card').forEach(card => {
    card.addEventListener('click', () => {
        showSection('sensores');
    });
});

// Conectar al WebSocket en Node-RED
const ws = new WebSocket("ws://localhost:1880/ws/sensores"); // Cambia la URL según la configuración de tu Node-RED

// Recibir datos del servidor WebSocket
ws.onmessage = function (event) {
    // Parsear los datos recibidos (JSON)
    const data = JSON.parse(event.data);

    // Actualizar indicadores principales
    if (data) {
        // Actualizar Temperatura
        const temperatura = data.temperatura || 0;
        document.querySelector(".sensor-card:nth-child(1) .value").innerText = `${temperatura}°C`;

        // Actualizar Capacidad
        const capacidad = data.capacidad || 0;
        document.querySelector(".sensor-card:nth-child(2) .value").innerText = `${capacidad}%`;

        // Actualizar Humedad
        const humedad = data.humedad || 0;
        document.querySelector(".sensor-card:nth-child(3) .value").innerText = `${humedad}%`;

        // Actualizar Estado de la Carga
        const carga = data.carga || "Desconocida";
        document.querySelector(".sensor-card:nth-child(4) .value").innerText = carga;

        // Actualizar Registros (opcional)
        const registros = document.querySelector(".sensor-records tbody");
        const now = new Date();
        const timestamp = `${now.toLocaleDateString()} - ${now.toLocaleTimeString()}`;
        const nuevaFila = `
            <tr>
                <td>${timestamp}</td>
                <td>${temperatura}°C</td>
                <td>${capacidad}%</td>
                <td>${humedad}%</td>
            </tr>
        `;
        registros.insertAdjacentHTML("afterbegin", nuevaFila); // Agregar nuevo registro al inicio
    }
};

// Manejo de errores de WebSocket
ws.onerror = function (error) {
    console.error("WebSocket Error: ", error);
};

// Manejo de cierre del WebSocket
ws.onclose = function () {
    console.warn("WebSocket cerrado. Intentando reconexión...");
    // Puedes implementar reconexión si lo deseas
};
