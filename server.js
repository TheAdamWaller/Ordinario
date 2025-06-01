const express=require('express');
const app=express();
const port=3000;
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
	res.send("Hola mundo desde mi servidor Node-Express");
});

app.get('/archivo',(req,res) => {
	res.sendFile(__dirname+"/index.html");
});

app.post('/enviar', (req,res) => {
	const nombre=req.body.nombre;
	const mensaje=`Hola ${nombre}`;
	res.send(mensaje);
});

app.listen(port,() => {
	console.log(`Server attending at ${port}`);
});