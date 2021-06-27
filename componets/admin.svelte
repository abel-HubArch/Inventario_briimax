<script>
//	import Usuarios from './herramientas/Usuarios.svelte';
	//import Crear_Usuario_Nuevo from './herramientas/Crear_Usuario_Nuevo.svelte';
//	import ModelosImplementar from './herramientas/Modelos-implementar.svelte';
	//import ImplementarModelos from './herramientas/implementar_modelos.svelte';
	//import Implementar_Materia from './herramientas/implementar_Materia.svelte';
//	import Materia from './herramientas/materia.svelte';

  // var implementar_materia = false 
   //var imMateriaButton = "inactive1" 
 //  const implementarMateria = ()=>{
 //      if (implementar_materia == false) {
        implementar_materia = true
        imMateriaButton =  "active1"
       } else {
        implementar_materia = false;
        imMateriaButton =  "inactive1"
       }
   }

   var implementar_modelo = false 
 //  var imModeloButton = "inactive2" 
  // const implementarModelo = ()=>{
       if (implementar_modelo == false) {
        implementar_modelo = true
 //       imModeloButton =  "active2"
       } else {
        implementar_modelo = false;
        imModeloButton =  "inactive2"
       }
   }


   var crearUsuario = false 
  // var imUsuarioButton = "inactive3" 
  // const crear_usuario = ()=>{
       if (crearUsuario == false) {
        crearUsuario = true
        imUsuarioButton =  "active3"
       } else {
   //     crearUsuario = false;
        imUsuarioButton =  "inactive3"
       }
   }


   var usuarios = false 
   var imUsuariOButton = "inactive4" 
  // const usuarioS = ()=>{
       if (usuarios == false) {
        usuarios = true
        imUsuariOButton =  "active4"
       } else {
        usuarios = false;
        imUsuariOButton =  "inactive4"
       }
   }
</script>
<style>
    
    .container{
        margin: auto;
        width: 100%;
        text-align: center;
    }
  
    .container .materia{
	border: 1px solid #ddd;
	background: #f1f1f1;
	overflow-y: scroll;
    width: 100%;
    }
    .active1{
        background-color: green;
        color: white;
    }
    .inactive1{
        background-color: white;
        color: black;
    }
    .active2{
        background-color: green;
        color: white;
    }
    .inactive2{
        background-color: white;
        color: black;
    }
    .active3{
        background-color: green;
        color: white;
    }
    .inactive3{
        background-color: white;
        color: black;
    }

    .active4{
        background-color: green;
        color: white;
    }
    .inactive4{
        background-color: white;
        color: black;
    }
 
 
</style>

<div class="container">
    <h1>Inventario</h1>
    <h2>Bienvenido Brian</h2>

      <!--Materia Prima-->
    <div class="materia">
     <Materia></Materia>
    </div>
   
    <button on:click="{implementarMateria}" class="{imMateriaButton} btn btn-primary">Implementar y Editar Materia</button> <button on:click="{implementarModelo}" class="{imModeloButton} btn btn-primary">Introducir Modelo</button>
    <button on:click="{crear_usuario}" class="{imUsuarioButton} btn btn-primary">Crear usuarios</button> <button on:click="{usuarioS}" class="{imUsuariOButton} btn btn-primary">Usuarios creados</button>
 {#if implementar_materia}
       <!--historias de materia prima-->
     <div class="Implementar_Materia">
        <Implementar_Materia></Implementar_Materia>
        </div>
 {/if}
   
 {#if implementar_modelo}
       <!--Implementar Modelos-->
       <div class="implementar_modelos">
        <ImplementarModelos></ImplementarModelos>
       </div>
 {/if}

    
 {#if crearUsuario}
      <!-- Crear usuario Nuevo -->
      <div class="CrearUsuario">
        <Crear_Usuario_Nuevo></Crear_Usuario_Nuevo>
    </div>
 {/if}
    
{#if usuarios}
<div class="usuarios">
    <Usuarios></Usuarios>
</div>
{/if}
   
    
 
     <!--Vender Modelos-->
    <div class="vender_modelos">
        <h2 style="margin-top: 30px;">Modelos</h2>
        <ModelosImplementar></ModelosImplementar>
    </div>
</div>
