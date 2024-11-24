// Manejar el menú lateral
const menuButton = document.getElementById("menu-btn");
const sidebar = document.getElementById("sidebar");

menuButton.addEventListener("click", () => {
    sidebar.classList.toggle("active");
});

document.addEventListener("DOMContentLoaded", () => {
    // Manejar inicio de sesión
    const loginForm = document.getElementById("login-form");
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Evita el envío por defecto

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (!username || !password) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        // Simulación de verificación de credenciales
        const correctUsername = "admin";
        const correctPassword = "1234";

        if (username === correctUsername && password === correctPassword) {
            alert("Inicio de sesión exitoso");
            // Mostrar la sección de contenedores
            showSection("contenedores");
        } else {
            alert("Credenciales incorrectas");
        }
    });

    // Agregar eventos de clic a todos los contenedores
    document.querySelectorAll(".container").forEach(container => {
        container.addEventListener("click", () => {
            // Obtener el ID del contenedor desde el atributo data-contenedor
            const contenedorId = container.getAttribute("data-contenedor");

            // Cambiar dinámicamente el título de la sección de sensores
            document.getElementById("sensor-title").innerText = `CONTENEDOR #${contenedorId}`;

            // Mostrar la vista de sensores
            showSection("sensores");
        });
    });

    // WebSocket para recibir datos en tiempo real desde Node-RED
    const ws = new WebSocket("ws://localhost:1880/ws/sensores"); // Cambia la URL según tu configuración de Node-RED

    ws.onmessage = function (event) {
        // Parsear los datos recibidos (JSON)
        const data = JSON.parse(event.data);

        if (data) {
            // Actualizar indicadores principales
            document.getElementById("temp-value").innerText = `${data.temperatura || "-"}°C`;
            document.getElementById("capacidad-value").innerText = `${data.distancia || "-"}%`;
            document.getElementById("humedad-value").innerText = `${data.humedad || "-"}%`;
            document.getElementById("carga-value").innerText = data.luz || "Desconocida";

            // Actualizar registros en la tabla
            const registros = document.getElementById("records-body");
            const now = new Date();
            const timestamp = `${now.toLocaleDateString()} - ${now.toLocaleTimeString()}`;
            const nuevaFila = `
                <tr>
                    <td>${timestamp}</td>
                    <td>${data.temperatura || "-"}</td>
                    <td>${data.distancia || "-"}</td>
                    <td>${data.humedad || "-"}</td>
                </tr>
            `;
            registros.insertAdjacentHTML("afterbegin", nuevaFila); // Agregar nuevo registro al inicio
        }
    };

    // Manejo de errores de WebSocket
    ws.onerror = function (error) {
        console.error("WebSocket Error: ", error);
    };

    // Manejo del cierre del WebSocket
    ws.onclose = function () {
        console.warn("WebSocket cerrado. Puedes implementar reconexión si es necesario.");
    };
});

// Función para cambiar entre secciones
function showSection(sectionId) {
    // Ocultar todas las secciones
    const sections = document.querySelectorAll("section");
    sections.forEach(section => {
        section.classList.add("hidden");
        section.classList.remove("active");
    });

    // Mostrar la sección seleccionada
    const sectionToShow = document.getElementById(sectionId);
    if (sectionToShow) {
        sectionToShow.classList.remove("hidden");
        sectionToShow.classList.add("active");
    }

    // Mostrar siempre el botón del menú
    menuButton.style.display = "block";
}



// Manejar clics en el sidebar
const sidebarLinks = document.querySelectorAll("#sidebar a");
sidebarLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault(); // Prevenir comportamiento predeterminado
        const sectionId = link.getAttribute("href").substring(1); // Obtener ID de sección sin el '#'
        showSection(sectionId); // Cambiar a la sección correspondiente
    });
});

