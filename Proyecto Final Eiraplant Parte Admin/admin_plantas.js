document.addEventListener("DOMContentLoaded", () => {
    const plantasContainer = document.getElementById("plantasContainer");

    // 🔥 Mostrar los botones solo si hay sesión activa
    if (sessionStorage.getItem("adminLoggedIn")) {
        plantasContainer.classList.remove("hidden");
    }

    // 🔹 Redirección al formulario para agregar plantas
    document.querySelector("button:nth-child(1)").addEventListener("click", () => {
        window.location.href = "admin_add_plant.html";
    });

    // 🔹 Redirección a la página de edición de plantas
    document.querySelector("button:nth-child(2)").addEventListener("click", () => {
        window.location.href = "admin_edit_plant.html";
    });

    // 🔹 Confirmación antes de eliminar una planta
    document.querySelector("button:nth-child(3)").addEventListener("click", () => {
        if (confirm("⚠️ ¿Seguro que deseas eliminar esta planta? Esta acción no se puede deshacer.")) {
            alert("✅ Planta eliminada!");
        }
    });
});
