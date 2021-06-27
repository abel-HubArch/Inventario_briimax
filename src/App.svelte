<script>
	import "firebase/auth";
    import { db, ref, firebaseSession, firebaseAuth} from './firebase';
	import Admin from './../componets/admin.svelte';

var session = {
	email: "",
	password: ""
};
//logueandose
var iniciando = "";
function logout() {
	firebaseAuth.signInWithEmailAndPassword(session.email, session.password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
	console.log("Usuario Logueado con Exito");
	iniciando = "iniciando Sesion";
	console.log(user);
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
	alert("Clave de usuario incorrecta")
  });
}

var usuario = "";
var usuarioEmail;
var usuarioNombre;

//igresamos usuario
var datosUsuario = {
   imagen: "",
   estado: "",
   email: "",
   nombre: "",
   password: "",
   tipo: "",
}

var pedidos = [];

firebaseAuth.onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    var uid = user.uid;
	console.log("Usuario ya Logueado antes" + "uid: " + uid);
	console.log(user);
	usuario = user.uid;
    usuarioEmail = user.email;
    usuarioNombre = user.displayName;
	// ...
    
	db.collection("Usuarios").doc(user.email)
    .onSnapshot((doc) => {
        var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
        datosUsuario.imagen = doc.data().imagen;
		datosUsuario.estado = doc.data().estado;
		datosUsuario.tipo = doc.data().tipo;
		datosUsuario.email = doc.data().email;
		datosUsuario.password = doc.data().password;
		console.log('El log de collecion es ' + datosUsuario.email)
		


		db.collection(datosUsuario.email).onSnapshot(querySnapshot =>{
        let docs = []
        querySnapshot.forEach(doc =>{       
        console.log(doc.data())
        docs.push({...doc.data(), id: doc.id});
        pedidos = [...docs]
          });
       });
    });
  

  } else {
    console.log("inicie session");
  }
});





//pedido terminado

function pedidoFinalizado(cantidadPedido, fechaDePedido, diaEntrega, horaDeEntrega, img, costoFinal, nombreDelPedido, costoDelModelo, productorId, productorNombre, pagoDeEmpleado) {
	var result = window.confirm('Desea confirmar el pedido finalizado?');
    if (result) {
		
		var borrarGuardado = nombreDelPedido.replace(/\s+/g, '');
		db.collection(datosUsuario.email).doc(borrarGuardado).delete().then(() => {
        console.log("Se borro correctamente:" + nombreDelPedido);
		   
        }).catch((error) => {
        console.error("Error removing document: ", error);
        });

	}else{
alert('no aceptaste :(')
	}
}


</script>
<style>
	.menuClosed{
		display: none;
	}
	.menu {
		text-align: center;
		padding: 1em;
		width: 100%;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}
	.usuario .header img{
		width: 300px;
		height: 300px;
		border-radius: 20px;
	}
	.usuario .pedidos .pendientes img {
		width: 300px;
		height: 300px;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
	 <!-- content here -->
	 
	

{#if usuario == "hjMV36BmrudyDJNOArvynPKrvBF2"}
	 <!-- content here -->
	 <Admin></Admin>
{:else if  usuario}
     <div class="usuario card text-white bg-primary mb-3" align="center">
       <div class="header card-body">
		   <h1 style="color: white; font-size: 20px;">Bienvenido <br> {usuarioNombre}</h1>
		   <h2 style="color: white; font-size: 20px;">usuario <br>{usuarioEmail}</h2>
		   <img src="{datosUsuario.imagen}" alt="">
		   <h3 style="color: white;">{datosUsuario.estado}</h3>
		   <p style="color: white;">{datosUsuario.tipo}</p>
		  
	   </div>
	  <hr style="background-color: white;">
	   <div class="pedidos">
		   <h2 style="color: white;">Pendientes</h2>
		   {#each pedidos as pedidos}
		   <!-- content here -->
		     <div class="pendientes">
				 <h1 style="color: white; font-size: 18px; margin-top: 30px;">{pedidos.pedidoModelo}</h1>
				 <img src="{pedidos.imagenModelos}" style="width: 80%" alt="">
				 <h2 style="color: white; margin-top: 30px;">Cantidad <strong>{pedidos.cantidadModelo}</strong></h2>
				 <h2 style="color: white; font-size: 18px;">El pedido fue realizado alas: <br> {pedidos.fechaDePedido}</h2>
				 <h2 style="color: orange; font-size: 20px; margin-top: 20px;">Debe entregarlo {pedidos.horaDeEntrega}</h2>
				 <h2 style="color: orange; font-size: 20px; margin-top: 20px;">a la Hora de <br> {pedidos.fechaDeEntrega}</h2>
				 <h2 style="color: white;">Tu paga sera de</h2>
				 <h1 style="color: green;"><strong>{pedidos.pagaDeEmpleado}Bs</strong></h1>
				 <h2 style="color: white; font-size: 17px;">Id: {pedidos.productorId}</h2>
				 <h2 style="color: white; font-size: 17px;">Nombre: {pedidos.productorNombre}</h2>
				 <button on:click="{pedidoFinalizado(pedidos.cantidadModelo, pedidos.fechaDePedido, pedidos.horaDeEntrega, pedidos.fechaDeEntrega, pedidos.imagenModelos, pedidos.modelosVendidos, pedidos.pedidoModelo, pedidos.precioModelo, pedidos.productorId, pedidos.productorNombre, pedidos.pagaDeEmpleado)}" class="btn btn-primary btn-lg">Cumplido!</button>
				 <hr style="background-color: white;">
			 </div>
		  {/each}
	   </div>
	
	</div>
   
{:else}
	 <!-- else content here -->
	 <main class="menu">

		<div class="form-group">
			<label for="exampleInputEmail1" class="form-label mt-4">Correo de Empleado</label>
			<input bind:value="{session.email}" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
		  </div>

		  <div class="form-group">
			<label for="exampleInputPassword1" class="form-label mt-4">Clave de empleado</label>
			<input bind:value="{session.password}" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
		  </div>
		  <button on:click="{logout}" type="button" class="btn btn-primary">Iniciar {iniciando}</button>
          

	   </main>
{/if}

