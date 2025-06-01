document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("adminRegisterForm");

    if (registerForm) {
        registerForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            const name = document.getElementById("name").value;
            const admin_id = document.getElementById("admin_id").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            try {
                const response = await fetch("http://localhost:3000/api/registerClient", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, admin_id, email, password }),
                });

                const data = await response.json();

                if (data.success) {
                    alert("✅ Alta de cliente exitosa!");
                    registerForm.reset();
                } else {
                    alert(`❌ ${data.message}`);

                    // 🔥 Mostrar coincidencias si existen
                    if (data.existingData) {
                        let folioField = document.getElementById("admin_id"); // 🔥 Ubicación al lado de Folio y Correo
                        let logContainer = document.createElement("div");
                        logContainer.style.position = "absolute";
                        logContainer.style.left = `${folioField.offsetLeft + folioField.offsetWidth + 20}px`; // 🔥 A la derecha
                        logContainer.style.top = `${folioField.offsetTop}px`; // 🔥 Alineado con Folio
                        logContainer.style.background = "#ffcc00";
                        logContainer.style.padding = "10px";
                        logContainer.style.borderRadius = "8px";
                        logContainer.style.boxShadow = "0px 0px 10px rgba(0,0,0,0.5)";
                        logContainer.style.fontSize = "14px";
                        logContainer.style.zIndex = "1000";
                        logContainer.innerHTML = `
                            <strong>❌ Coincidencias encontradas:</strong><br>
                            <strong>Nombre:</strong> ${data.existingData.name}<br>
                            <strong>Folio:</strong> ${data.existingData.admin_id}<br>
                            <strong>Correo:</strong> ${data.existingData.email}
                        `;
                        document.body.appendChild(logContainer);

                        // 🔥 Ocultar después de 10 segundos
                        setTimeout(() => {
                            logContainer.remove();
                        }, 10000);
                    }
                }
            } catch (error) {
                console.error("❌ Error en el registro:", error);
                alert("❌ Error en el servidor. Intenta más tarde.");
            }
        });
    }
});
