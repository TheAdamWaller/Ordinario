document.addEventListener("DOMContentLoaded", () => {
    const editForm = document.getElementById("clientEditForm");
    const deleteButton = document.getElementById("deleteButton");

    // 🔥 Cargar datos del cliente en el formulario
    const clientData = JSON.parse(sessionStorage.getItem("clientData"));
    if (clientData) {
        document.getElementById("name").value = clientData.name;
        document.getElementById("admin_id").value = clientData.admin_id;
        document.getElementById("email").value = clientData.email;
    }

    // 🔥 Guardar cambios en la BD
    editForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const updatedData = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
        };

        try {
            const response = await fetch(`http://localhost:3000/api/updateClient/${clientData.admin_id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedData),
            });

            const data = await response.json();

            if (data.success) {
                alert("✅ Cliente actualizado correctamente!");
                window.location.href = "admin_client_list.html";
            } else {
                alert("❌ Error al actualizar cliente.");
            }
        } catch (error) {
            console.error("❌ Error en la actualización:", error);
            alert("❌ Error en el servidor. Intenta más tarde.");
        }
    });

    // 🔥 Borrar cliente con confirmación
    deleteButton.addEventListener("click", async () => {
        const confirmDelete = confirm("⚠️ ¿Estás seguro de que quieres borrar este cliente? Esta acción no se puede deshacer.");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`http://localhost:3000/api/deleteClient/${clientData.admin_id}`, {
                method: "DELETE",
            });

            const data = await response.json();

            if (data.success) {
                alert("🗑️ Cliente eliminado correctamente!");
                window.location.href = "admin_client_list.html";
            } else {
                alert("❌ Error al borrar cliente.");
            }
        } catch (error) {
            console.error("❌ Error al borrar cliente:", error);
            alert("❌ Error en el servidor. Intenta más tarde.");
        }
    });
});
