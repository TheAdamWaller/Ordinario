const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Conexión a MongoDB Atlas
mongoose.connect("mongodb+srv://Pedro:koala71s@eiraplant.1rsw31z.mongodb.net/adminDB?retryWrites=true&w=majority&appName=Eiraplant", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ Conectado a MongoDB Atlas"))
.catch((error) => console.error("❌ Error de conexión:", error));

// Definir el esquema y modelo
const AdminSchema = new mongoose.Schema({
    email: String,
    password: String,
});

const Admin = mongoose.model("Admin", AdminSchema);

// Agregar un nuevo administrador con contraseña encriptada
const addAdmin = async () => {
    const email = "ZeusBlink18@gmail.com";
    const plainPassword = "asd1234";

    try {
        const hashedPassword = await bcrypt.hash(plainPassword, 10); // 🔒 Encripta la contraseña
        const newAdmin = new Admin({ email, password: hashedPassword });

        await newAdmin.save();
        console.log("✅ Administrador agregado correctamente con contraseña segura!");
    } catch (error) {
        console.error("❌ Error al agregar admin:", error);
    } finally {
        mongoose.connection.close(); // Cierra la conexión después de agregar el admin
    }
};

// Ejecutar la función
addAdmin();
