<script>
  import "firebase/auth";
  import { now } from "svelte/internal";
  import { db } from './../../src/firebase';

//pintamos los datos

var modelos = [];

db.collection('Overoles Modelos').onSnapshot(querySnapshot =>{
    let docs = []
    querySnapshot.forEach(doc =>{       
        console.log(doc.data())
        docs.push({...doc.data(), id: doc.id});
        modelos = [...docs]
    });
});
var usuarios = [];

db.collection('Usuarios').onSnapshot(querySnapshot =>{
    let docs = []
    querySnapshot.forEach(doc =>{       
        console.log(doc.data())
        docs.push({...doc.data(), id: doc.id});
        usuarios = [...docs]
    });
});

var producir = "producirNone";
var ventana = "ventanaOpen";

function OpenProducir() {
  producir = "producirOpen";
  ventana = "ventanaClosed";
}

function CerrarProducir() {
  producir = "producirNone";
  ventana = "ventanaOpen";
}

//Producir Overoles



var datosDeProduccion = {
  cantidad: "",
  costo: "",
  informacion: "",
  fechaDeEntrega: "",
  horaDeEntrega: "",
  pagaDeEmpleado: ""
}

var costoModelos;
var precioDelModelo;
var precioFinal;
function sumaPrecio(costoModelo) {
  costoModelos = parseInt(datosDeProduccion.cantidad) * parseInt(costoModelo);
  datosDeProduccion.costo = costoModelos;
  console.log(costoModelos);
  precioDelModelo = costoModelo;
  precioFinal = costoModelos;  
}
var pagaTotalEmpleado; 
function sumaPagaEmpleado(paga) {
  pagaTotalEmpleado = parseInt(datosDeProduccion.cantidad) * parseInt(paga);

  console.log('la paga del empleado es ' + pagaTotalEmpleado + " paga de empleado " + paga + " precio del modelo " + datosDeProduccion.cantidad);
}

var datosDelPedido = {}

var hoy = new Date();



function producirOveroles(nombre, id, titulo, img) {
  var fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear() + ' Ala hora de: ' + hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
  console.log(fecha);
  
  
  datosDelPedido = {
    pedidoModelo: titulo,
    cantidadModelo: datosDeProduccion.cantidad,
    precioModelos: precioDelModelo,
    imagenModelos: img,
    modelosVendidos: precioFinal,
    cantidadModelo: datosDeProduccion.cantidad,
    fechaDeEntrega: datosDeProduccion.fechaDeEntrega,
    horaDeEntrega: datosDeProduccion.horaDeEntrega,
    fechaDePedido: fecha,
    productorId: id,
    productorNombre: nombre,
    pagaDeEmpleado: pagaTotalEmpleado
  }
  var documentoGuardado = datosDelPedido.pedidoModelo.replace(/\s+/g, '');
  var docDocument = datosDelPedido.productorId;
  db.collection(docDocument).doc(documentoGuardado).set(datosDelPedido)
  .then(
  console.log("documento subido correctamente")
   );
   db.collection('HistorialDeVentas').doc(datosDeProduccion.productorId).set(datosDelPedido).then(
    console.log("se subio correctamente")
   );
   db.collection('Usuarios').doc(id).update({estado: "Ocupado"})
 console.log(datosDelPedido);
}




</script>
<style>
.modelos{
    width: 100%;
    
    background-color: sandybrown;
  
}
.modelos .modelo{
    width: 100%;
    height: 50%;
    background-color: rgb(33, 36, 34);
    display: inline-block;
    text-align: center;
    color: white;
}

.modelos .producirNone{
  display: none;
}
.modelos .producirOpen{
  display: block;
}
.modelos .ventanaOpen{
  display: block;
}
.modelos .ventanaClosed{
  display: none;
}
.modelos .modelo .pedido .trabajadores{
  width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
    display: inline-block;
    text-align: center;
    margin: auto;
  
}
.modelos .modelo .pedido .trabajadores .trabajador{
  display: inline-block;
}
.modelos .modelo .pedido .trabajadores .trabajador img{
  width: 320px;
  height: 320px;
  margin: 10px 20px 0px 20px;
 
}

</style>


<div class="modelos">
    
     {#each modelos as modelos}
          <!-- content here -->
          <div class="modelo {ventana}">
              
            <img class="imgproducir" src="{modelos.url}" alt="{modelos.Titulo}" style="width: 90%; height: 350px; margin-top: 20px;">
                <h5 class="title" style="color: white;  margin-top: 20px;">{modelos.Titulo}</h5>
                <h5 class="precio" style="color: white; =">{modelos.Precio}</h5>
              <p class="texto">{modelos.Caracteristicas}</p>
             
           <button on:click="{OpenProducir}">Producir</button> <button>Editar</button> <button>Eliminar</button> <button>informacion</button>
         </div>
         <!-- Producir --> 
         <div class="{producir}">
          <div class="producir">Producir</div>
             <div class="modelo">
              <h1 class="title" style="color: white; margin-top: 20px;">{modelos.Titulo}</h1>
               <img class="imgproducir" src="{modelos.url}" alt="{modelos.Titulo}" style="width: 90%; height: 350px;">
                <h3 class="precio" style="color: white; margin-top: 20px;">{modelos.Precio}Bs</h3>
               <p class="texto">{modelos.Caracteristicas}</p>

                <div class="pedido">
                  <label for="">Cantidad</label> <br>
                  <input type="text" bind:value="{datosDeProduccion.cantidad}" on:keydown="{sumaPrecio(modelos.Precio)}" on:keyup="{sumaPrecio(modelos.Precio)}"><br>
                  <label for="">Precio</label><br>
                  <input type="text" bind:value="{costoModelos}"><br>
                  <label for="">Descripcion</label><br>
                  <textarea name="" bind:value="{datosDeProduccion.informacion}" id="" cols="30" rows="10"></textarea><br>
                  <label for="">Fecha de Entrega</label><br>
                  <input type="date" bind:value="{datosDeProduccion.horaDeEntrega}"><br>
                  <label for="">Hora de Entrega</label><br>
                  <input type="time" bind:value="{datosDeProduccion.fechaDeEntrega}"><br>
                  <label for="">Ingrese la paga del empleado por unidad de {modelos.Titulo}</label><br>
                  <input type="number" bind:value="{datosDeProduccion.pagaDeEmpleado}" on:keydown="{sumaPagaEmpleado(datosDeProduccion.pagaDeEmpleado)}" on:keyup="{sumaPagaEmpleado(datosDeProduccion.pagaDeEmpleado)}"><br>
                  <p>La paga de empleado es de: {pagaTotalEmpleado}Bs</p><br>
                  <div class="trabajadores">
                    <h2 style="color: white;">Enviar produccion a:</h2>
                  {#each usuarios as usuarios}
                  <!-- content here -->
                  <div class="trabajador">
                      <img src="{usuarios.imagen}" alt="">
                      <h1 style="color: white;">{usuarios.nombre}</h1>
                      <h1 style="color: white;">{usuarios.tipo}</h1> 
                      <h2 style="color: white;">{usuarios.email}</h2>
                      {#if usuarios.estado == "Libre"}
                          <h2 style="color: green">{usuarios.estado}</h2>
                      {:else}
                           <h2 style="color: red">{usuarios.estado}</h2>
                      {/if}
                     
                      <button on:click="{producirOveroles(usuarios.nombre, usuarios.email, modelos.Titulo, modelos.url)}" class="btn btn-primary btn-lg">Enviar a {usuarios.nombre}</button>
                  </div>
             {/each}
            </div>



                </div>
             </div>
          <button on:click="{CerrarProducir}" class="btn btn-primary">Cerrar</button>
         </div>
    
     {/each}
       

   
</div>