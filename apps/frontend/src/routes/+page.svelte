<script lang="ts">
	import { onMount } from 'svelte';
	import { createUser, getUsers } from './data.remote';

	const data = $derived(await getUsers());

	async function createUserHandler() {
		const data = await createUser();
		console.log(data);
	}

	onMount(() => {
		const websocket = new WebSocket('ws://localhost:8787/websocket');
		websocket.onmessage = (event) => {
			console.log(event);
		};

		websocket.onerror = (event) => {
			console.log('error', event);
		};
	});
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<button onclick={createUserHandler}>Create User</button>

<pre>
  {JSON.stringify(data, null, 2)}
</pre>
