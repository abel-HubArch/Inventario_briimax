<script>
import { db } from './../../src/firebase';

//pintamos los datos
let selected = "0";
var aumentar = {
    cantidad: "0"
}
var materia_prima = [];

db.collection('materia_prima').onSnapshot(querySnapshot =>{
    let docs = []
    querySnapshot.forEach(doc =>{       
        console.log(doc.data())
        docs.push({...doc.data(), id: doc.id});
        materia_prima = [...docs]
    });
});

// agregar nueva materia



const subir = ()=>{
   // Set the "capital" field of the city 'DC'
   var actualizacion = db.collection("materia_prima").doc(selected);

// Set the "capital" field of the city 'DC'
return actualizacion.update({
    cantidad: aumentar.cantidad
})
.then(() => {
    console.log("Document successfully updated!");
});
}

//agregar nueva seccion



var item = {
    materia: '',
    cantidad: ''
}

const subir_item = ()=>{
    db.collection('materia_prima').doc(item.materia).set(item);
}

</script>

<style>
.container{
    text-align: center;
}
</style>


<div class="container">
    <h1>Aumentar Inventario</h1>
    <input bind:value="{aumentar.cantidad}" type="number" placeholder="Ingresar Cantidad Para Aumentar">
    <select bind:value={selected}>
        {#each materia_prima as materia_prima}
            <option value={materia_prima.materia}>{materia_prima.materia}</option> 
        {/each}
    </select>
    <br>
    <button on:click="{subir}">Implementar</button>
    Selected {selected}
    <h1>Implementar Nueva Materia</h1>
    <input bind:value="{item.materia}" type="text" placeholder="Ingresa Nueva Materia"> <br>
    <input bind:value="{item.cantidad}" type="text" placeholder="Ingrese la Cantidad"> <br>
    <button on:click="{subir_item}">Implementar</button>
</div>