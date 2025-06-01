document.addEventListener("DOMContentLoaded", () => {
    const editForm = document.getElementById("editPlantForm");
    const deletePlantButton = document.getElementById("deletePlant");
    
    // 🔥 Cargar datos de la planta en el formulario
    const plantDataRaw = sessionStorage.getItem("plantData");
    let plantData = plantDataRaw ? JSON.parse(plantDataRaw) : null;

    if (plantData) {
        document.getElementById("plantName").value = plantData.plantName || "";
        document.getElementById("plantInfo").value = plantData.plantInfo || "";
        document.getElementById("waterLevel").value = plantData.waterLevel || 1;
    }

    // 🔹 Guardar cambios en la BD
    editForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        if (!plantData || !plantData._id) {
            alert("⚠️ No se pudo identificar la planta a modificar.");
            return;
        }

        const updatedData = {
            plantName: document.getElementById("plantName").value.trim(),
            plantInfo: document.getElementById("plantInfo").value.trim(),
            waterLevel: parseInt(document.getElementById("waterLevel").value, 10),
        };

        try {
            const response = await fetch(`http://localhost:3000/api/updatePlant/${plantData._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) throw new Error("Error en la respuesta del servidor");

            const data = await response.json();

            if (data.success) {
                alert("✅ Información actualizada correctamente!");
                window.location.href = "admin_plantas.html";
            } else {
                alert("❌ Error al actualizar la planta: " + (data.error || "No especificado"));
            }
        } catch (error) {
            console.error("❌ Error al actualizar planta:", error);
            alert("❌ Error en el servidor. Intenta más tarde.");
        }
    });

    // 🔹 Borrar planta con confirmación
    deletePlantButton.addEventListener("click", async () => {
        if (!plantData || !plantData._id) {
            alert("⚠️ No se pudo identificar la planta a eliminar.");
            return;
        }

        const confirmDelete = confirm("⚠️ ¿Seguro que deseas eliminar esta planta? Esta acción no se puede deshacer.");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`http://localhost:3000/api/deletePlant/${plantData._id}`, {
                method: "DELETE",
            });

            if (!response.ok) throw new Error("Error en la respuesta del servidor");

            const data = await response.json();

            if (data.success) {
                alert("🗑️ Planta eliminada correctamente!");
                window.location.href = "admin_plantas.html";
            } else {
                alert("❌ Error al borrar la planta: " + (data.error || "No especificado"));
            }
        } catch (error) {
            console.error("❌ Error al borrar planta:", error);
            alert("❌ Error en el servidor. Intenta más tarde.");
        }
    });
});
