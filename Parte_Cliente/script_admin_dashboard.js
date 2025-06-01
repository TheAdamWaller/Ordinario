document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Obtener lista de plantas desde el catálogo
        const response = await fetch('http://localhost:5000/catalogo-plantas');
        const data = await response.json();

        if (!response.ok) {
            console.error("❌ Error al cargar plantas:", data.message);
            return;
        }

        // Generar casillas dinámicamente en una estructura compacta
        const plantasContainer = document.getElementById('plantasContainer');
        plantasContainer.classList.add('plantas-grid'); // Agregamos clase para estilos compactos

        plantasContainer.innerHTML = ''; // Limpiar antes de agregar elementos

        data.plantas.forEach(plant => {
            const label = document.createElement('label');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = plant;
            checkbox.name = 'plants';

            label.classList.add('plant-item'); // Clase para diseño compacto
            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(` ${plant}`));
            plantasContainer.appendChild(label);
        });

    } catch (error) {
        console.error("❌ Error al obtener catálogo de plantas:", error);
    }
});

// 🔹 Registrar nuevo cliente con selección de plantas
document.getElementById('clientRegisterForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const folio = document.getElementById('folio').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const date = document.getElementById('date').value;
    const password = document.getElementById('password').value;

    // Obtener las plantas seleccionadas
    const selectedPlants = Array.from(document.querySelectorAll('input[name="plants"]:checked'))
                               .map(checkbox => checkbox.value);

    try {
        const response = await fetch('http://localhost:5000/admin/register-client', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('adminToken')}` 
            },
            body: JSON.stringify({ folio, name, email, phone, plants: selectedPlants, date, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert('✅ Cliente registrado con éxito');
            document.getElementById('clientRegisterForm').reset(); 
        } else {
            alert('❌ Error: ' + data.message);
        }
    } catch (error) {
        console.error("❌ Error al registrar cliente:", error);
    }
});
