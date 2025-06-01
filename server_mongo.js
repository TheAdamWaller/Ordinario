const express=require('express');
const cors=require('cors');
const app=express();
const port=3000;

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//Traernos la cadena de conexion de mongodb
const {MongoClient, ServerApiVersion} = require('mongodb');
const uri='mongodb+srv://Pedro:src21@cluster0.6nupw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
	

	//Creamos la conexion

const cliente=new MongoClient(uri,{
	serverApi:{
		version:ServerApiVersion.v1,
		strict:true,
		deprecationErrors:true,
	}
});

async function run(){
	try{
		await cliente.connect();
		await cliente.db("admin").command({ping:1});
		console.log("Conexion exitosa");
	}finally{
		await cliente.close();
	}
}


app.get('/', async (req,res)=>{
	res.send("Hola mundo desde mi servidor Node-Express");
	await client.connect();
	const db=cliente.db("sample_mflix");
	const collection=db.collection("movies");
	const resultado= await collection.find({poster:{$ne:null}},{_id:0,title:1,poster:1,plot:1}).toArray();
	res.json(resultado);
});


app.listen(port,async () => {
	console.log(`Server attending at ${port}`);
	await run();
});