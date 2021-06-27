
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


<table class="table table-hover">
 
    <thead>
       <tr>
    {#each materia_prima as materia_prima}
       <!-- content here -->
       <td>{materia_prima.materia}</td>
    {/each}
       </tr>
    </thead>
   
      
    <tbody>

      <tr>
        {#each materia_prima as materia_prima}
        <!-- content here -->
        <td>{materia_prima.cantidad}<br>{materia_prima.cajas_o_unidades}</td>
       {/each}
      </tr>

      <tr>
       {#each materia_prima as materia_prima}
       <!-- content here -->
       <td>{materia_prima.precio}Bs</td>
       {/each}
       </tr>

    </tbody>
</table>


