document.getElementById('clienteRegisterForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const folio = document.getElementById('folio').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:5000/client/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ folio, name, email, phone, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert('✅ Registro exitoso. Ahora puedes iniciar sesión.');
            window.location.href = 'cliente_login.html'; // Redirigir al login
        } else {
            // Bloquear si el folio no está registrado por un admin
            if (data.message.includes('❌ Este folio no está dado de alta')) {
                alert('❌ No puedes registrarte hasta que un administrador dé de alta tu folio.');
            } else {
                alert('❌ Error: ' + data.message);
            }
        }
    } catch (error) {
        console.error('❌ Error al conectar con el servidor:', error);
        alert('❌ No se pudo completar el registro.');
    }
});
