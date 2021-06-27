<script>
import { db, ref } from './../../src/firebase';

let selected = "0";
var materia_prima = [];

db.collection('materia_prima').onSnapshot(querySnapshot =>{
    let docs = []
    querySnapshot.forEach(doc =>{       
        console.log(doc.data())
        docs.push({...doc.data(), id: doc.id});
        materia_prima = [...docs]
    });
});
var materias = {
    titulo: "",
    elegidas: "",
    precio: "",
    texto: "",
}

//Creamos una variable tipo objeto
var materia_elegida = {
    texto: "Las materias son: "
};

var informacion = "";

function materiaElegida(tipo){
    //agregamos un objeto con corchetes y adentro colocamos el dato e igualamos con la materia elegida o tambien con un string
    if(materias.elegidas == ""){
   alert("ingresa Numero")
    }else{
        materia_elegida[tipo] = materias.elegidas;
         informacion += `${tipo}: ${materias.elegidas} | `;
        console.log(materia_elegida);      
         materias.elegidas = "";
    }

};

//Subiendo imagen
let files;
var nombreArchivo;
var archivo;
$: if (files) {
		// Note that `files` is of type `FileList`, not an Array:
		// https://developer.mozilla.org/en-US/docs/Web/API/FileList
		console.log(files);

		for (const file of files) {
			console.log(file.name);
            nombreArchivo = file.name;
            archivo = file;
		}
	}

let  avatar, fileinput, name;

var horario = new Date().toString();

	const onFileSelected =(e)=>{

          
  let image = e.target.files[0];
            let reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e => {
                 avatar = e.target.result
            };
            //remplazando espacios 
            var fecha = horario.replace(/\s+/g, ''); 
            var titulo_imagen = materias.titulo.replace(/\s+/g, ''); 
            //generando nombre
            name =  'modeloparaproduccion' + titulo_imagen + "-" + "inventario-overol-briimax.jpg";
            console.log(name);
}       

 var direccionImage  = "";

const subirModelo = ()=>{

   // Create file metadata including the content type
var metadata = {
  contentType: 'image/jpeg',
};
    //subimos la imagen
    const task = ref.child(nombreArchivo).put(archivo);
     //subimos los datos
    task
    .then(snapshot => snapshot.ref.getDownloadURL())
    .then( url => {
        direccionImage = url;
        console.log(url);
        alert("imagen subida")
        materia_elegida["url"] = url;
        materia_elegida["Titulo"] = materias.titulo;
        materia_elegida["Precio"] = materias.precio;
        materia_elegida["Caracteristicas"] = informacion; 
        db.collection('Overoles Modelos').doc(materias.titulo).set(materia_elegida);
        informacion = "";
    });

    

     
}



</script>

<style>
#app{
	display:flex;
		align-items:center;
		justify-content:center;
		flex-flow:column;
}
 
	.upload{
		display:flex;
	height:50px;
		width:50px;
		cursor:pointer;
	}
	.avatar{
		display:flex;
		height:200px;
		width:200px;
	}

</style>

<h1 style="margin-top: 20px;">Introducir Modelo</h1>
<h2>{informacion}</h2>
<div class="introducir_entrada">    
    <h4>Introducir Entrada</h4>
     <h3>Titulo</h3>
    <input type="text" bind:value="{materias.titulo}" placeholder="Titulo"> <br>
    {#each materia_prima as materia_prima} 
    <label for="" style="margin-top: 29px;">cantidad {materia_prima.cantidad} {materia_prima.cajas_o_unidades} <br> {materia_prima.materia} </label> <br> <input type="text" bind:value="{materias.elegidas}" placeholder="{materia_prima.materia}"> <br>
    <button on:click="{materiaElegida(materia_prima.materia)}">Crear</button> <br>
    {/each}
    <h2 style="margin-top: 15px;">Precio</h2>
    <input type="text" bind:value="{materias.precio}" placeholder="Precio"> <br>
    <!-- parte de la imagen -->
    <div id="app">
        <h1>Sube la Imagen de Modelo</h1>
      
            {#if avatar}
            <img class="avatar" src="{avatar}" alt="d" />
            {:else}
            <img class="avatar" src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png" alt="" /> 
            {/if}
                    <img class="upload" src="https://static.thenounproject.com/png/625182-200.png" alt="" on:click={()=>{fileinput.click();}} />
            <div class="chan" on:click={()=>{fileinput.click();}}>Esta es la Imagen</div>
            <input style="display:none" bind:files type="file" accept=".jpg, .jpeg, .png" on:change={(e)=>onFileSelected(e)} bind:this={fileinput} >
    
    </div>
     <button on:click="{subirModelo}" class="btn btn-primary">Subir Modelo</button>
     
</div>


<div class="introducir_modelo">

</div>
