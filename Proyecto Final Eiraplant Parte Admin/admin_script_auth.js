document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("adminLoginForm");
    const logoutButton = document.getElementById("logoutButton");

    // 🔐 Autenticación del administrador
    if (loginForm) {
        loginForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            try {
                const response = await fetch("http://localhost:3000/api/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                });

                const data = await response.json();

                if (data.success) {
                    // 🔥 Guardar sesión y redirigir al panel de administrador
                    sessionStorage.setItem("adminLoggedIn", "true");
                    window.location.href = "admin_panel.html";
                } else {
                    alert("❌ Credenciales incorrectas. Intenta de nuevo.");
                }
            } catch (error) {
                console.error("❌ Error en el login:", error);
                alert("❌ Error en el servidor. Intenta más tarde.");
            }
        });
    }

    // 🚪 Cierre de sesión del administrador
    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            sessionStorage.removeItem("adminLoggedIn"); // 🔥 Eliminar sesión
            window.location.href = "admin_login_simple.html"; // 🔥 Redirigir al login
        });
    }

    // 🔥 Verificar si el usuario está autenticado antes de cargar el panel
    if (window.location.pathname.includes("admin_panel.html") && !sessionStorage.getItem("adminLoggedIn")) {
        window.location.href = "admin_login_simple.html"; // 🔥 Redirigir si no hay sesión activa
    }
});
