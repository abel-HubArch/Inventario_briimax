<script>
	import Admin from './../componets/admin.svelte';

var sesion = {
	password: 'brian123'
};

var login = 'menu';
const logout = ()=>{
	if (sesion.password == 'brian123') {
	login = 'menuClosed';
} 
}



</script>
	 <!-- content here -->
	 
	 <main class="{login}">
		<h1>Inventario</h1>
		<h3>Clave</h3>
		
       

		<input bind:value="{sesion.password}" type="password"> 
		<button on:click="{logout}">Entrar</button>
	
	   </main>

{#if sesion.password == 'brian123'}
<Admin></Admin>
{:else if sesion.password == 'ss'}
	 <!-- else if content here -->
	 <h1>hola</h1>
{:else}
	 <!-- else content here -->
{/if}

<style>
	.menuClosed{
		display: none;
	}
	.menu {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>