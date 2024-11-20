// Manejar navegación
document.getElementById("menu-btn").addEventListener("click", () => {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("hidden");
});

// Cambiar vistas
document.querySelectorAll("a[href^='#']").forEach(link => {
    link.addEventListener("click", event => {
        event.preventDefault();
        const target = link.getAttribute("href").substring(1);
        document.querySelectorAll(".view").forEach(view => {
            view.classList.toggle("active", view.id === target);
        });
    });
});
