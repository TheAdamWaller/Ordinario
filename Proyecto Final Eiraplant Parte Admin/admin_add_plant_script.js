<script>
document.getElementById("plantForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // 🔄 Evita la recarga de página

    const formData = new FormData(this); // 📦 Captura los datos del formulario

    const response = await fetch("http://localhost:3000/api/addPlant", {
        method: "POST",
        body: formData
    });

    const result = await response.json();

    if (result.success) {
        const plantName = formData.get("name"); // 🔍 Obtiene el nombre de la planta
        const successMessage = `✅ Planta "${plantName}" ha sido dada de alta con éxito!`;

        // 🎯 Muestra el mensaje en la misma página sin redireccionar
        const messageElement = document.getElementById("successMessage");
        messageElement.innerText = successMessage;
        messageElement.style.display = "block";
        messageElement.style.background = "rgba(0, 255, 0, 0.2)";
        messageElement.style.padding = "10px";
        messageElement.style.border = "2px solid #00ff00";
        messageElement.style.borderRadius = "5px";
        messageElement.style.boxShadow = "0px 0px 10px rgba(0, 255, 0, 0.8)";
        messageElement.style.transition = "opacity 0.5s ease-in-out";
        messageElement.style.opacity = "1";

        // 🔄 Limpia el formulario después del registro
        document.getElementById("plantForm").reset();

        // ⏳ Ocultar mensaje después de 3 segundos
        setTimeout(() => {
            messageElement.style.opacity = "0";
            setTimeout(() => {
                messageElement.style.display = "none";
            }, 500);
        }, 3000);
    } else {
        alert("❌ Error al registrar la planta. Inténtalo nuevamente.");
    }
});
</script>
