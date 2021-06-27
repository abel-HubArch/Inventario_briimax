<script>
import { db } from './../../src/firebase';
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
</script>

<style>

</style>

<h1>Introducir Modelo</h1>

<div class="introducir_entrada">
    <h4>Introducir Entrada</h4>

    <h6>Cantidad de Materia</h6>
    <input type="text" placeholder="Titulo">
    <select bind:value={selected}>
        {#each materia_prima as materia_prima}
            <option value={materia_prima.materia}>{materia_prima.materia}</option> 
        {/each}
    </select>
</div>


<div class="introducir_modelo">

</div>
