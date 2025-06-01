// Importar módulos necesarios
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(cors());

// Conectar MongoDB directamente
const MONGO_URI = 'mongodb+srv://Pedro:koala71s@eiraplant.1rsw31z.mongodb.net/?retryWrites=true&w=majority&appName=Eiraplant'; // Sustituye con tu enlace correcto
mongoose.connect(MONGO_URI, {
}).then(() => console.log('✅ MongoDB conectado'))
.catch(err => console.error('❌ Error de conexión:', err));

// Clave secreta para tokens
const JWT_SECRET = 'CLAVE_SECRETA_SEGURA'; // Reemplázala por algo más seguro

// Definir esquemas y modelos
const adminSchema = new mongoose.Schema({
    username: String,
    password: String
});
const clientSchema = new mongoose.Schema({
    folio: String,
    name: String,
    email: String,  // ✅ Agregar correo
    phone: String,  // ✅ Agregar teléfono
    plants: [String],  // ✅ Agregar lista de plantas compradas
    date: String,  // ✅ Agregar fecha de compra
    password: String
});


const Admin = mongoose.model('Admin', adminSchema);
const Client = mongoose.model('Client', clientSchema);

// Ruta: Login de Administrador
app.post('/admin/login', async (req, res) => {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });

    if (!admin || !await bcrypt.compare(password, admin.password)) {
        return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    const token = jwt.sign({ adminId: admin._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

// Ruta: Registro de Cliente (por parte del Admin)
app.post('/admin/register-client', async (req, res) => {
    const { folio, name, email, phone, plants, date, password } = req.body;

    if (!password || password.trim() === '') {
        return res.status(400).json({ message: '❌ La contraseña es obligatoria' });
    }

    const existingClient = await Client.findOne({ folio });
    if (existingClient) {
        return res.status(400).json({ message: '❌ El cliente ya está registrado' });
    }

    // Encriptar la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);
    const newClient = new Client({ folio, name, email, phone, plants, date, password: hashedPassword });

    await newClient.save();
    res.status(201).json({ message: '✅ Cliente registrado correctamente' });
});

// Ruta: Modificar cliente según folio
app.put('/admin/update-client', async (req, res) => {
    try {
        const { folio, name, email, phone, plants, date, password } = req.body;

        const existingClient = await Client.findOne({ folio });

        if (!existingClient) {
            return res.status(404).json({ message: '❌ No se encontró un cliente con este folio.' });
        }

        // Si el admin ingresó una nueva contraseña, encriptarla antes de guardarla
        if (password && password.trim() !== '') {
            existingClient.password = await bcrypt.hash(password, 10);
        }

        // Actualizar otros datos
        existingClient.name = name || existingClient.name;
        existingClient.email = email || existingClient.email;
        existingClient.phone = phone || existingClient.phone;
        existingClient.plants = plants || existingClient.plants;
        existingClient.date = date || existingClient.date;

        await existingClient.save();
        res.status(200).json({ message: '✅ Cliente actualizado correctamente.' });

    } catch (error) {
        res.status(500).json({ message: '❌ Error al modificar cliente.', error });
    }
});


// Ruta: Login de Cliente
app.post('/client/login', async (req, res) => {
    const { folio, password } = req.body;
    const client = await Client.findOne({ folio });

    if (!client || !await bcrypt.compare(password, client.password)) {
        return res.status(401).json({ message: 'Folio o contraseña incorrectos' });
    }

    const token = jwt.sign({ clientId: client._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

// Ruta: Registro de cliente (Solo clientes con folio previamente dado de alta)
app.post('/client/register', async (req, res) => {
    try {
        const { folio, name, email, phone, password } = req.body;

        // Verificar si el folio ya existe en MongoDB
        const existingClient = await Client.findOne({ folio });

        // Si el folio NO existe en la BD, impedir el registro
        if (!existingClient) {
            return res.status(400).json({ message: '❌ Este folio no está dado de alta por un admin. Contacta al administrador.' });
        }

        // Encriptar la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(password, 10);

        // Actualizar el cliente con su nueva información
        existingClient.name = name;
        existingClient.email = email;
        existingClient.phone = phone;
        existingClient.password = hashedPassword;
        await existingClient.save();

        res.status(201).json({ message: '✅ Cuenta creada con éxito.' });

    } catch (error) {
        res.status(500).json({ message: '❌ Error en el registro', error });
    }
});


// Ruta: Login de cliente con verificación de folio
app.post('/client/login', async (req, res) => {
    try {
        const { folio, password } = req.body;

        // Verificar si el folio está registrado en MongoDB
        const client = await Client.findOne({ folio });

        if (!client) {
            return res.status(400).json({ message: '❌ Folio no registrado. ¿Quieres crear una cuenta con este folio?' });
        }

        // Comparar la contraseña encriptada
        const isMatch = await bcrypt.compare(password, client.password);
        if (!isMatch) {
            return res.status(401).json({ message: '❌ Contraseña incorrecta.' });
        }

        // Generar token para la sesión del cliente
        const token = jwt.sign({ clientId: client._id }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: '✅ Inicio de sesión exitoso.', token });

    } catch (error) {
        res.status(500).json({ message: '❌ Error en el login', error });
    }
});

// Ruta: Obtener perfil del cliente según el token de sesión
app.get('/client/profile', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        // Verificar si hay un token
        if (!token) {
            return res.status(401).json({ message: '❌ No autorizado. Debes iniciar sesión.' });
        }

        // Decodificar el token y obtener el ID del cliente
        const decoded = jwt.verify(token, JWT_SECRET);
        const client = await Client.findById(decoded.clientId);

        // Si el cliente no existe, devolver un error
        if (!client) {
            return res.status(404).json({ message: '❌ Cliente no encontrado.' });
        }

        // Enviar la información del cliente
        res.status(200).json({
            folio: client.folio,
            name: client.name,
            email: client.email,
            phone: client.phone,
            plants: client.plants || [],
            date: client.date || 'Fecha no disponible',
            cuidados: client.cuidados || []
        });

    } catch (error) {
        res.status(500).json({ message: '❌ Error al obtener el perfil', error });
    }
});

// Ruta: Obtener lista de plantas disponibles en el catálogo
app.get('/catalogo-plantas', async (req, res) => {
    try {
        // Simulación de datos, puedes conectarlo con MongoDB si quieres gestionarlas dinámicamente
        const plantasCatalogo = [
            "Monstera", "Ficus", "Orquídea", "Aloe Vera", "Cactus", "Bambú",
            "Bonsai", "Helecho", "Lavanda", "Rosa", "Tulipán", "Margarita",
            "Girasol", "Lirio", "Jazmín", "Crisantemo", "Geranio", "Begonia",
            "Azalea", "Violeta"
        ];

        res.status(200).json({ plantas: plantasCatalogo });

    } catch (error) {
        res.status(500).json({ message: "❌ Error al obtener catálogo de plantas", error });
    }
});


// Configurar el puerto y levantar el servidor
const PORT = 5000; // Puedes cambiar el puerto si lo necesitas
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
