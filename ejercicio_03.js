const cuadro=document.querySelector('#miId');
cuadro.textContent="Este texto viene desde JavaScript";

const contenedor=document.querySelector('.miClase');
contenedor.textContent="Este texto viene desde JavaScript también";

function logEvent(event){
	console.log(`El evento ${event.type} fue disparado`)
}

function agregarClase(event){
	contenedor.classList.toggle('claseNueva');
}

contenedor.addEventListener('click', agregarClase);


//Agregar un evento de mouse
cuadro.addEventListener('click', () => {cuadro.innerText="Hiciste click en el contenedor"});
cuadro.addEventListener('dblclick', () => {cuadro.textContent=""});

cuadro.addEventListener('mouseover',logEvent);
cuadro.addEventListener('mousedown',logEvent);
cuadro.addEventListener('mouseup',logEvent);
cuadro.addEventListener('mousemove',logEvent);
cuadro.addEventListener('mouseout',logEvent);

