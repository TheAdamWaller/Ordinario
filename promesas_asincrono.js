// promise (promesas)
/*const datos=[
	{id:1, title:'Avengers', year:2008},
	{id:2, title:'Spiderman', year:2014},
	{id:3, title:'Batman', year:2022}
];*/

/*const getDatos= () => {
	console.log(datos);
}*/

/*const getDatos = () =>{
	setTimeout(()=>{
		return datos;
	},3000);
}*/

// Simulamos que no hay datos
const datos = [];

const getDatos = () => {
	return new Promise((resolve, reject) => {
		if (datos.length === 0) {
			reject(new Error("El arreglo esta vacio"));
		} else {
			setTimeout(() => {
				resolve(datos);
			}, 600);
		}
	});
}

// Forma con then/catch (por si la quieres)
/*
getDatos()
	.then((resultado) => {
		console.log(resultado);
	})
	.catch((error) => {
		console.log(error.message);
	});
*/

// Forma con async/await + manejo de errores
async function obtieneDatos() {
	try {
		const resultado = await getDatos();
		console.log(resultado);
	} catch (error) {
		console.error("⚠️ Error capturado:", error.message);
	}
}

obtieneDatos();

console.log("Mensaje despues del resultado");
