document.getElementById('adminLoginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:5000/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (response.ok) {
        localStorage.setItem('adminToken', data.token); // Guarda el token para autenticación
        window.location.href = 'admin_dashboard.html'; // Redirigir al panel de administración
    } else {
        alert('Error: ' + data.message);
    }
});
