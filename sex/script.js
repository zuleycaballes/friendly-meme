// Manejar el menú lateral
document.getElementById("menu-btn").addEventListener("click", () => {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("hidden");
});

// Cambiar vistas al hacer clic en los enlaces
document.querySelectorAll("a[href^='#']").forEach(link => {
    link.addEventListener("click", event => {
        event.preventDefault(); // Evitar comportamiento predeterminado del enlace

        const target = link.getAttribute("href").substring(1); // Obtener el ID del destino
        const views = document.querySelectorAll(".view"); // Todas las vistas

        // Mostrar solo la vista seleccionada
        views.forEach(view => {
            if (view.id === target) {
                view.classList.add("active"); // Mostrar
                view.classList.remove("hidden");
            } else {
                view.classList.remove("active"); // Ocultar
                view.classList.add("hidden");
            }
        });

        // Cerrar el menú lateral si está abierto
        const sidebar = document.getElementById("sidebar");
        if (!sidebar.classList.contains("hidden")) {
            sidebar.classList.add("hidden");
        }
    });
});
