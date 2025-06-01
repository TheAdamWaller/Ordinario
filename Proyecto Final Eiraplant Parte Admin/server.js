const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const multer = require("multer");

const app = express();
app.use(express.json());
app.use(cors());

// 🔗 Conexión a MongoDB Atlas
mongoose.connect("mongodb+srv://Pedro:koala71s@eiraplant.1rsw31z.mongodb.net/adminDB?retryWrites=true&w=majority&appName=Eiraplant", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ Conectado a MongoDB Atlas"))
.catch((error) => console.error("❌ Error de conexión:", error));

// 🔹 Esquema y modelo de Administrador
const AdminSchema = new mongoose.Schema({
    email: String,
    password: String,
});

const Admin = mongoose.model("Admin", AdminSchema);

// 🔐 Ruta de autenticación de administradores
app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });

        if (admin && await bcrypt.compare(password, admin.password)) {
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    } catch (error) {
        console.error("❌ Error en la autenticación:", error);
        res.status(500).json({ success: false, message: "Error en el servidor" });
    }
});

// 🔹 Esquema y modelo de Clientes
const ClientSchema = new mongoose.Schema({
    name: String,
    admin_id: String, // 🔥 Folio tal cual lo escriben
    email: String,
    password: String,
});

const Client = mongoose.model("Client", ClientSchema);

// 📝 Ruta para registrar clientes con validación de folio y correo
app.post("/api/registerClient", async (req, res) => {
    const { name, admin_id, email, password } = req.body;

    try {
        // 🔍 Verificar si el cliente ya existe por folio o correo
        const existingClient = await Client.findOne({ $or: [{ admin_id }, { email }] });

        if (existingClient) {
            return res.json({ 
                success: false, 
                message: "❌ El cliente ya está registrado en la BD.", 
                existingData: { name: existingClient.name, admin_id: existingClient.admin_id, email: existingClient.email }
            });
        }

        // 🔒 Encriptar la contraseña y registrar nuevo cliente
        const hashedPassword = await bcrypt.hash(password, 10);
        const newClient = new Client({ name, admin_id, email, password: hashedPassword });

        await newClient.save();
        res.json({ success: true, message: "✅ Alta de cliente exitosa!" });
    } catch (error) {
        console.error("❌ Error al registrar cliente:", error);
        res.status(500).json({ success: false, message: "Error en el servidor" });
    }
});

// 📝 Ruta para buscar clientes por folio o correo
app.get("/api/getClient", async (req, res) => {
    const { search } = req.query;

    try {
        const client = await Client.findOne({ $or: [{ admin_id: search }, { email: search }] });

        if (client) {
            res.json({ success: true, client });
        } else {
            res.json({ success: false, message: "❌ No se encontró ningún cliente con esos datos." });
        }
    } catch (error) {
        console.error("❌ Error en la búsqueda:", error);
        res.status(500).json({ success: false, message: "Error en el servidor" });
    }
});

// 📝 Ruta para actualizar cliente
app.put("/api/updateClient/:admin_id", async (req, res) => {
    const { admin_id } = req.params;
    const updatedData = req.body;

    try {
        const client = await Client.findOneAndUpdate({ admin_id }, updatedData, { new: true });

        if (client) {
            res.json({ success: true, message: "✅ Cliente actualizado correctamente!" });
        } else {
            res.json({ success: false, message: "❌ No se encontró el cliente." });
        }
    } catch (error) {
        console.error("❌ Error al actualizar cliente:", error);
        res.status(500).json({ success: false, message: "Error en el servidor" });
    }
});

// 🗑️ Ruta para borrar cliente
app.delete("/api/deleteClient/:admin_id", async (req, res) => {
    const { admin_id } = req.params;

    try {
        const client = await Client.findOneAndDelete({ admin_id });

        if (client) {
            res.json({ success: true, message: "🗑️ Cliente eliminado correctamente!" });
        } else {
            res.json({ success: false, message: "❌ No se encontró el cliente." });
        }
    } catch (error) {
        console.error("❌ Error al borrar cliente:", error);
        res.status(500).json({ success: false, message: "Error en el servidor" });
    }
});

// 🚀 Iniciar servidor
app.listen(3000, () => {
    console.log("✅ Servidor corriendo en http://localhost:3000");
});
