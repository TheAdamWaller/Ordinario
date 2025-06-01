const usuarios = [
  {
    id: 1,
    nombre: "Juan",
    apellido: "Pérez",
    correo: "juan.perez@example.com",
    telefono: "555-123-4567",
    comentario: "Cliente potencial"
  },
  {
    id: 2,
    nombre: "María",
    apellido: "García",
    correo: "maria.garcia@example.com",
    telefono: "555-987-6543",
    comentario: "Solicitó más información"
  },
  {
    id: 3,
    nombre: "Carlos",
    apellido: "López",
    correo: "carlos.lopez@example.com",
    telefono: "555-456-7890",
    comentario: "Interesado en el producto"
  },
  {
    id: 4,
    nombre: "Ana",
    apellido: "Martínez",
    correo: "ana.martinez@example.com",
    telefono: "555-321-0987",
    comentario: "Programó una cita"
  },
  {
    id: 5,
    nombre: "Luis",
    apellido: "Torres",
    correo: "luis.torres@example.com",
    telefono: "555-654-3210",
    comentario: "Llamar la próxima semana"
  },
  {
    id: 6,
    nombre: "Sofía",
    apellido: "Sánchez",
    correo: "sofia.sanchez@example.com",
    telefono: "555-789-0123",
    comentario: "Requiere seguimiento"
  },
  {
    id: 7,
    nombre: "Pedro",
    apellido: "Ruiz",
    correo: "pedro.ruiz@example.com",
    telefono: "555-012-3456",
    comentario: "Solicitó cotización"
  },
  {
    id: 8,
    nombre: "Lucía",
    apellido: "Fernández",
    correo: "lucia.fernandez@example.com",
    telefono: "555-345-6789",
    comentario: "Consulta sobre disponibilidad"
  },
  {
    id: 9,
    nombre: "Miguel",
    apellido: "Gómez",
    correo: "miguel.gomez@example.com",
    telefono: "555-678-9012",
    comentario: "Cliente frecuente"
  },
  {
    id: 10,
    nombre: "Elena",
    apellido: "Morales",
    correo: "elena.morales@example.com",
    telefono: "555-901-2345",
    comentario: "Pendiente de respuesta"
  }
];

tabla=document.querySelector('#tabla');

function crearTabla(){
  var cadena= "<table><thead>";
  cadena=cadena+"<tr><th>ID</th>";
  cadena=cadena+"<th>Nombre</th>";
  cadena=cadena+"<th>Apellido</th>";
  cadena=cadena+"<th>Correo</th>";
  cadena=cadena+"<th>Telefono</th>";
  cadena=cadena+"<th>Comentario</th></tr></thead>";
  cadena=cadena+"<tbody>";

  for(const usuario of usuarios){
    cadena=cadena+"<tr>";
    cadena=cadena+"<td>"+usuario.id+"</td>";
    cadena=cadena+"<td>"+usuario.nombre+"</td>";
    cadena=cadena+"<td>"+usuario.apellido+"</td>";
    cadena=cadena+"<td>"+usuario.correo+"</td>";
    cadena=cadena+"<td>"+usuario.telefono+"</td>";
    cadena=cadena+"<td>"+usuario.comentario+"</td>";
    cadena=cadena+"</tr>"

  }
  cadena=cadena+"</tbody>";
  cadena=cadena+"</table>";
  tabla.innerHTML=cadena;
}

function agregarFila(){
  const id=document.getElementById("id").value;
  const nombre=document.getElementById("nombre").value;
  const apellido=document.getElementById("apellido").value;
  const correo=document.getElementById("correo").value;
  const telefono=document.getElementById("telefono").value;
  const comentario=document.getElementById("comentario").value;
  
  if (id && nombre && apellido && correo && telefono && comentario) {
    let contenedor=document.querySelector('#tabla').getElementsByTagName('tbody')[0];
    const nuevaFila=contenedor.insertRow();

    nuevaFila.innerHTML=`
      <td>${id}</td>
      <td>${nombre}</td>
      <td>${apellido}</td>
      <td>${correo}</td>
      <td>${telefono}</td>
      <td>${comentario}</td>
    `;
    document.getElementById("formulario").reset();

  }
  else{
    alert("Los datos no están completos");
  }
}

crearTabla();
