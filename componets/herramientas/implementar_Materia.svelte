<script>
import { db } from './../../src/firebase';

//pintamos los datos
let selected = "No Seleccionaste";
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


//agregar nueva seccion



var item = {
    materia: '',
    cantidad: '',
    precio: '',
    cajas_o_unidades: ''
}

const subir_item = ()=>{
    db.collection('materia_prima').doc(item.materia).set(item);
}



// agregar nueva materia

var suma_Elegida = 0;

const subir = async ()=>{
    //leemos el documento con el valor de selected
    const document = await db.collection("materia_prima").doc(selected).get(); 
    console.log(document.data().cantidad); // Desenvuelve el documento
     console.log(document.id); // Muestra la ID del documento
 
    suma_Elegida = parseInt(document.data().cantidad) + parseInt(aumentar.cantidad);
     console.log(suma_Elegida);


    //actualizamos el documento con la suma
var actualizacion = db.collection("materia_prima").doc(selected);
return actualizacion.update({
    cantidad: suma_Elegida
})
.then(() => {
    console.log("Document successfully updated!");

});

}

</script>

<style>
.container{
    text-align: center;
}
</style>


<div class="container" style="margin-top: 20px;">
    <h1>Editar Inventario</h1>
    <input bind:value="{aumentar.cantidad}" type="number" placeholder="Ingresar Cantidad Para Aumentar">
    <select bind:value={selected}>
        {#each materia_prima as materia_prima}
            <option value={materia_prima.materia}>{materia_prima.materia}</option> 
        {/each}
    </select>
    <br>
    
    <button on:click="{subir}" class="btn btn-primary" style="margin-top: 20px;">Implementar</button> <br>
    <h3 style="color: green; margin-top: 20px;" >Materia a Subir <br> {selected}</h3> 
    <h1 style="margin-top: 26px;">Implementar Nueva Materia</h1>
    <input bind:value="{item.materia}" type="text" style="margin-top: 20px;" placeholder="Ingresa Nueva Materia"> <br>
    <input bind:value="{item.cantidad}" type="text" style="margin-top: 20px;" placeholder="Ingrese la Cantidad"> <br>
    <input bind:value="{item.cajas_o_unidades}" style="margin-top: 20px;" type="text" placeholder="Ingresa si es unidad o caja"><br>
    <input bind:value="{item.precio}" type="text" style="margin-top: 20px;" placeholder="Ingrese Precio de {item.cajas_o_unidades}"> <br>
    <button on:click="{subir_item}" class="btn btn-primary" style="margin-top: 20px;">Implementar</button>
</div>