const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const MONGO_URI = 'mongodb+srv://Pedro:koala71s@eiraplant.1rsw31z.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('✅ Conectado a MongoDB'))
.catch(err => console.error('❌ Error:', err));

// Definir esquema y modelo
const adminSchema = new mongoose.Schema({
    username: String,
    password: String
});
const Admin = mongoose.model('Admin', adminSchema);

// Crear un nuevo admin
async function crearAdmin() {
    const hashedPassword = await bcrypt.hash('1234', 10); // Cambia la contraseña aquí
    const newAdmin = new Admin({ username: 'admin', password: hashedPassword });

    await newAdmin.save();
    console.log('✅ Administrador registrado con éxito');
    mongoose.connection.close();
}

crearAdmin();
