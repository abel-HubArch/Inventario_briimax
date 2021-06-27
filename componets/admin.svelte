<script>
	import ImplementarModelos from './herramientas/implementar_modelos.svelte';
	import Implementar_Materia from './herramientas/implementar_Materia.svelte';
	import Materia from './herramientas/materia.svelte';


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
 
</style>

<div class="container">
    <h1>Inventario</h1>

      <!--Materia Prima-->
    <div class="materia">
     <Materia></Materia>
    </div>
   
    <!--historias de materia prima-->
     <div class="Implementar_Materia">
     <Implementar_Materia></Implementar_Materia>
     </div>

     <div class="implementar_modelos">
         <ImplementarModelos></ImplementarModelos>
     </div>
    
</div>