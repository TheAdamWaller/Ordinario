const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const CryptoJS = require('crypto-js');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Conexión MongoDB Atlas
const uri = "mongodb+srv://jorgestudillo:jorgestudillo@clusterroot.vpo4g.mongodb.net/RegistroUsuarios?appName=ClusterRoot";
mongoose.connect(uri);

// Esquema y modelo
const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true },
  contraseña: { type: String, required: true }
});
const Usuario = mongoose.model('Usuario', usuarioSchema);

// Ruta de registro
app.post('/registro', async (req, res) => {
  const { nombre, correo, contraseña } = req.body;

  if (!nombre || !correo || !contraseña) {
    return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
  }

  try {
    const nuevoUsuario = new Usuario({ nombre, correo, contraseña });
    const usuarioGuardado = await nuevoUsuario.save();
    res.status(201).json({ mensaje: 'Usuario registrado exitosamente', usuario: usuarioGuardado });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ mensaje: 'Error al registrar usuario' });
  }
});

// Ruta de login
app.post('/login', async (req, res) => {
  const { nombre, contraseña } = req.body;

  if (!nombre || !contraseña) {
    return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
  }

  try {
    const usuario = await Usuario.findOne({ nombre });
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const claveVerificar = CryptoJS.SHA256(contraseña).toString(CryptoJS.enc.Hex);
    if (claveVerificar !== usuario.contraseña) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    res.status(200).json({
      mensaje: 'Inicio de sesión exitoso',
      usuario: { nombre: usuario.nombre, correo: usuario.correo }
    });
  } catch (error) {
    console.error('Error durante el inicio de sesión:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
