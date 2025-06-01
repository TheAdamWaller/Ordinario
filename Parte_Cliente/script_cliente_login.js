document.getElementById('clienteLoginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const folio = document.getElementById('folio').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:5000/client/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ folio, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('clientToken', data.token); // Guarda el token de sesión
            alert('✅ Inicio de sesión exitoso');
            window.location.href = 'perfil_cliente.html'; // Redirigir al perfil
        } else {
            if (data.message.includes('Folio no registrado')) {
                const confirmarRegistro = confirm('❌ Este folio no está registrado. ¿Deseas crear una cuenta con este folio?');
                if (confirmarRegistro) {
                    window.location.href = `registro_cliente.html?folio=${folio}`;
                }
            } else {
                alert('❌ Error: ' + data.message);
            }
        }
    } catch (error) {
        console.error('❌ Error al conectar con el servidor:', error);
        alert('❌ No se pudo iniciar sesión.');
    }
});
