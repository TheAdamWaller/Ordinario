// Módulos

function sayHello(nombre) {
	return `Hola ${nombre}`;
}

function sayHelloWorld(){
	return 'Hola Mundo!';
}


//module.exports.sayHello = sayHello;
//module.exports.sayHelloWorld = sayHelloWorld;
//console.log(module.exports);

module.exports = {
	sayHello : sayHello,
	sayHelloWorld : sayHelloWorld
};