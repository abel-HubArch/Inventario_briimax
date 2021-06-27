<script>
 import firebase from "firebase/app";
  import "firebase/auth";
  import { db } from './../../src/firebase';

  var usuarios = [];

db.collection('Usuarios').onSnapshot(querySnapshot =>{
    let docs = []
    querySnapshot.forEach(doc =>{       
        console.log(doc.data())
        docs.push({...doc.data(), id: doc.id});
        usuarios = [...docs]
    });
});

</script>
<style>
.usuarios{
    width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
    display: inline-block;
    text-align: center;
    margin: auto;
}
.usuarios .trabajadores{
    display: inline-block;
}
.usuarios .trabajadores img{
 width: 300px;
 height: 300px;
 margin-right: 30px;
}
</style>

<div class="usuarios" style="margin-top: 20px;">
    {#each usuarios as usuarios}
         <!-- content here -->
         <div class="trabajadores">
             <img src="{usuarios.imagen}" alt="">
             <h1>{usuarios.nombre}</h1>
             <h1>{usuarios.tipo}</h1> 
             <h2>{usuarios.email}</h2>
             {#if usuarios.estado == "Ocupado"}
             <h2 style="color: red;">{usuarios.estado}</h2>
             {:else}
             <h2 style="color: green;">{usuarios.estado}</h2>
             {/if}
            
        </div>
    {/each}

</div>