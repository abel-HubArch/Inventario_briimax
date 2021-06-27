
<script>
  import { db } from './../../src/firebase';

//pintamos los datos

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
    td, th, tr{
     width: 400px;
 }

.tabla{
     margin: auto;
     width: 100%;
 }
</style>

<table class="tabla">
  <tr>
    {#each materia_prima as materia_prima}
       <!-- content here -->
       <th>{materia_prima.materia}</th>
    {/each}
  </tr>
  <tr>
    {#each materia_prima as materia_prima}
    <!-- content here -->
    <th>{materia_prima.cantidad}</th>
   {/each}
  </tr>
</table>


