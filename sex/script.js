// Manejar el menú lateral
document.getElementById("menu-btn").addEventListener("click", () => {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("hidden");
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