document.addEventListener("DOMContentLoaded", () => {
    // SPA dinámica para botones con data-target
    const links = document.querySelectorAll(".nav-link[data-target]");
    links.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const url = this.getAttribute("data-target");
            if (!url) return;

            fetch(url)
                .then(res => res.text())
                .then(html => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(html, "text/html");
                    const newContent = doc.querySelector("main")?.innerHTML;

                    if (newContent) {
                        document.getElementById("mainContent").innerHTML = newContent;
                        window.history.pushState({}, "", url);

                        // Reiniciar scripts dinámicos tras cambio de contenido
                        initProjectModals();
                    } else {
                        console.warn("No se encontró el contenido principal en la página cargada.");
                    }
                })
                .catch(err => {
                    console.error("Error al cargar la página:", err);
                });
        });
    });

    // Menú hamburguesa
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    if (menuToggle && navMenu) {
        const navLinks = document.querySelectorAll(".nav-link");
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("show");
            });
        });

        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("show");
        });
    }

    // Iniciar modales al cargar la página
    initProjectModals();
});

// ✅ Función para manejar modales de proyectos
function initProjectModals() {
    const modal = document.getElementById("projectModal");
    const modalTitle = document.getElementById("modal-title");
    const modalDesc = document.getElementById("modal-description");
    const closeBtn = document.querySelector(".close-modal");

    if (!modal || !modalTitle || !modalDesc || !closeBtn) return;

    const titles = ["Portafolio KechuDev", "App de Kiosco", "Landing Page Demo"];
    const descriptions = [
        "Mi portafolio personal con animaciones, secciones, contacto y SPA en ASP.NET Core.",
        "Sistema de gestión de stock, ventas y distribuidores para un kiosco. Desarrollado en C#.",
        "Landing page elegante con fondo animado, formulario funcional y diseño responsive."
    ];

    document.querySelectorAll(".project-card .btn").forEach((btn, i) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            modal.classList.add("show");
            modalTitle.textContent = titles[i] || "Proyecto";
            modalDesc.textContent = descriptions[i] || "Descripción del proyecto.";
        });
    });

    closeBtn.addEventListener("click", () => {
        modal.classList.remove("show");
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("show");
        }
    });
}
