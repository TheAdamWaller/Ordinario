document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Obtener el token guardado en el login
        const token = localStorage.getItem('clientToken');
        if (!token) {
            alert('❌ Debes iniciar sesión primero.');
            window.location.href = 'cliente_login.html';
            return;
        }

        // Obtener datos del cliente desde el servidor
        const response = await fetch('http://localhost:5000/client/profile', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            alert('❌ Error: ' + data.message);
            return;
        }

        // Mostrar los datos en el perfil
        document.getElementById('folio').textContent = data.folio;
        document.getElementById('name').textContent = data.name;
        document.getElementById('email').textContent = data.email;
        document.getElementById('phone').textContent = data.phone;
        document.getElementById('date').textContent = data.date;

        // Mostrar plantas compradas
        const plantsList = document.getElementById('plants');
        plantsList.innerHTML = ''; // Limpiar antes de agregar elementos
        data.plants.forEach(plant => {
            const li = document.createElement('li');
            li.textContent = plant;
            plantsList.appendChild(li);
        });

        // Mostrar cuidados específicos si existen
        const cuidadosDiv = document.getElementById('cuidados');
        cuidadosDiv.innerHTML = ''; // Limpiar antes de agregar contenido
        if (data.cuidados && data.cuidados.length > 0) {
            data.cuidados.forEach(cuidado => {
                const p = document.createElement('p');
                p.textContent = cuidado;
                cuidadosDiv.appendChild(p);
            });
        } else {
            cuidadosDiv.innerHTML = '<p>No hay información de cuidados disponible.</p>';
        }

    } catch (error) {
        console.error('❌ Error al cargar perfil:', error);
        alert('❌ No se pudo obtener la información.');
    }
});
