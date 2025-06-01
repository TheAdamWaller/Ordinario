document.addEventListener("DOMContentLoaded", () => {
    const searchForm = document.getElementById("clientSearchForm");
    const resultContainer = document.getElementById("clientResult");
    const modifyButton = document.createElement("button"); // 🔥 Crear botón dinámicamente

    // 🔥 Aplicar estilos del panel
    resultContainer.style.display = "none";
    resultContainer.style.background = "rgba(0, 0, 0, 0.8)";
    resultContainer.style.color = "#00ffcc"; // 🔥 Texto neón
    resultContainer.style.padding = "15px";
    resultContainer.style.borderRadius = "8px";
    resultContainer.style.border = "2px solid #00ffcc"; // 🔥 Borde neón
    resultContainer.style.boxShadow = "0px 0px 15px #00ffcc"; // 🔥 Efecto neón
    resultContainer.style.fontSize = "16px";
    resultContainer.style.textAlign = "center";
    resultContainer.style.position = "absolute";
    resultContainer.style.left = "50%";
    resultContainer.style.transform = "translateX(-50%)";
    resultContainer.style.width = "80%";
    resultContainer.style.transition = "opacity 0.5s ease-in-out";

    // 🔥 Estilos del botón "Modificar"
    modifyButton.textContent = "✏️ Modificar";
    modifyButton.style.display = "none";
    modifyButton.style.marginTop = "10px";
    modifyButton.style.padding = "10px";
    modifyButton.style.background = "#00ffcc";
    modifyButton.style.color = "#000";
    modifyButton.style.border = "none";
    modifyButton.style.borderRadius = "5px";
    modifyButton.style.cursor = "pointer";
    modifyButton.style.fontSize = "16px";
    modifyButton.style.boxShadow = "0px 0px 10px #00ffcc";

    document.body.appendChild(modifyButton); // 🔥 Agregar botón al DOM

    if (searchForm) {
        searchForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            const searchValue = document.getElementById("search").value;

            try {
                const response = await fetch(`http://localhost:3000/api/getClient?search=${searchValue}`);
                const data = await response.json();

                if (data.success) {
                    resultContainer.innerHTML = `
                        <strong>✅ Cliente encontrado:</strong><br>
                        <strong>Nombre:</strong> ${data.client.name}<br>
                        <strong>Folio:</strong> ${data.client.admin_id}<br>
                        <strong>Correo:</strong> ${data.client.email}
                    `;
                    resultContainer.style.opacity = "1";
                    resultContainer.style.display = "block";
                    modifyButton.style.display = "block"; // 🔥 Mostrar botón "Modificar"

                    // 🔥 Guardar datos en sessionStorage para editarlos después
                    sessionStorage.setItem("clientData", JSON.stringify(data.client));
                } else {
                    resultContainer.innerHTML = `<strong>❌ No se encontró ningún cliente con esos datos.</strong>`;
                    resultContainer.style.opacity = "1";
                    resultContainer.style.display = "block";
                    modifyButton.style.display = "none"; // 🔥 Ocultar botón si no hay resultados
                }

                // 🔥 Ocultar después de 30 segundos con animación
                setTimeout(() => {
                    resultContainer.style.opacity = "0";
                    modifyButton.style.display = "none"; // 🔥 Ocultar botón después de 30s
                    setTimeout(() => {
                        resultContainer.style.display = "none";
                    }, 500);
                }, 30000);
            } catch (error) {
                console.error("❌ Error en la búsqueda:", error);
                alert("❌ Error en el servidor. Intenta más tarde.");
            }
        });
    }

    // 🔥 Redirigir a la página de edición cuando se presiona "Modificar"
    modifyButton.addEventListener("click", () => {
        window.location.href = "admin_client_edit.html";
    });
});
