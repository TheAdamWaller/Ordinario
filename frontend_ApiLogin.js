function mostrarRegistro() {
  document.getElementById('registroModal').style.display = 'flex';
}

function cerrarRegistro() {
  document.getElementById('registroModal').style.display = 'none';
  const messageContainer = document.getElementById('messageContainer');
  messageContainer.textContent = '';
  messageContainer.className = '';
}

document.getElementById('registroForm').addEventListener('submit', async function(event) {
  event.preventDefault();
  const formData = new FormData(this);
  const datos = Object.fromEntries(formData.entries());
  const hashedPassword = CryptoJS.SHA256(datos.contraseña).toString(CryptoJS.enc.Hex);
  datos.contraseña = hashedPassword;
  const messageContainer = document.getElementById('messageContainer');

  try {
    const respuesta = await fetch('http://localhost:3000/registro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datos)
    });

    messageContainer.textContent = '';
    messageContainer.className = 'message';

    if (respuesta.ok) {
      messageContainer.classList.add('success');
      messageContainer.textContent = '¡Registro exitoso!';
      cerrarRegistro();
    } else {
      messageContainer.classList.add('error');
      messageContainer.textContent = 'Hubo un problema con el registro.';
    }
  } catch (error) {
    messageContainer.className = 'message error';
    messageContainer.textContent = 'No se pudo enviar los datos. Verifica tu conexión.';
  }
});

document.getElementById('loginForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  const formData = new FormData(this);
  const datos = Object.fromEntries(formData
